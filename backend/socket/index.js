import {
  choosePromptType,
  createRoom,
  createPlayerProfile,
  finalizeSpin,
  getAvailableRoomCodes,
  getChoiceDuration,
  getRoom,
  getSpinDuration,
  nextRound,
  removePlayer,
  resolveRound,
  spinBottle,
  startGame,
} from '../roomManager.js';

export function initializeSocket(io) {
  const roomSpinTimers = new Map();
  const roomChoiceTimers = new Map();

  const clearRoomSpinTimer = (roomCode) => {
    const activeTimer = roomSpinTimers.get(roomCode);
    if (activeTimer) {
      clearTimeout(activeTimer);
      roomSpinTimers.delete(roomCode);
    }
  };

  const clearRoomChoiceTimer = (roomCode) => {
    const activeTimer = roomChoiceTimers.get(roomCode);
    if (activeTimer) {
      clearTimeout(activeTimer);
      roomChoiceTimers.delete(roomCode);
    }
  };

  io.on('connection', (socket) => {
    socket.on('create-room', ({ name, mode } = {}, callback) => {
      if (!name?.trim()) {
        const errorPayload = {
          ok: false,
          message: 'Name is required to create a room.',
        };
        socket.emit('room-error', errorPayload);
        callback?.(errorPayload);
        return;
      }

      const { room, player } = createRoom({
        hostSocketId: socket.id,
        hostName: name.trim(),
        mode,
      });

      console.log('[FriendSpin] room created');
      console.log(`[FriendSpin] room code: ${room.code}`);
      console.log('[FriendSpin] available rooms:', getAvailableRoomCodes());

      socket.join(room.code);
      const successPayload = {
        ok: true,
        room,
        player,
      };
      socket.emit('room-created', successPayload);
      callback?.(successPayload);
      io.to(room.code).emit('room-updated', room);
    });

    socket.on('join-room', ({ name, roomCode } = {}, callback) => {
      const normalizedRoomCode = roomCode?.trim().toUpperCase() || '';

      console.log('[FriendSpin] join room request');
      console.log(`[FriendSpin] requested room code: ${normalizedRoomCode}`);
      console.log('[FriendSpin] available rooms:', getAvailableRoomCodes());

      if (!name?.trim() || !roomCode?.trim()) {
        const errorPayload = {
          ok: false,
          message: 'Name and room code are required.',
        };
        socket.emit('room-error', errorPayload);
        callback?.(errorPayload);
        return;
      }

      const room = getRoom(normalizedRoomCode);

      if (!room) {
        const errorPayload = {
          ok: false,
          message: 'Room not found.',
        };
        socket.emit('room-error', errorPayload);
        callback?.(errorPayload);
        return;
      }

      if (room.status === 'playing') {
        const errorPayload = {
          ok: false,
          message: 'This room is already in a live game.',
        };
        socket.emit('room-error', errorPayload);
        callback?.(errorPayload);
        return;
      }

      const existingPlayer =
        room.players.find((player) => player.id === socket.id) || null;

      const newPlayer =
        existingPlayer ||
        createPlayerProfile({
          id: socket.id,
          name: name.trim(),
          isHost: false,
        });

      if (!existingPlayer) {
        room.players.push(newPlayer);
      }

      socket.join(normalizedRoomCode);
      console.log('players after join:', room.players);

      const successPayload = {
        ok: true,
        roomCode: normalizedRoomCode,
        room,
        player: newPlayer,
      };

      socket.emit('room-joined', successPayload);
      callback?.(successPayload);

      if (!existingPlayer) {
        io.to(normalizedRoomCode).emit('player-joined', {
          player: newPlayer,
        });
      }
      io.to(normalizedRoomCode).emit('room-updated', room);
    });

    socket.on('get-room', ({ roomCode } = {}, callback) => {
      const room = getRoom(roomCode);

      if (!room) {
        const errorPayload = {
          ok: false,
          message: 'Room not found.',
        };
        socket.emit('room-error', errorPayload);
        callback?.(errorPayload);
        return;
      }

      socket.join(room.code);
      socket.emit('room-updated', room);
      callback?.({
        ok: true,
        room,
      });
    });

    socket.on('start-game', ({ roomCode } = {}, callback) => {
      const room = getRoom(roomCode);

      if (!room) {
        callback?.({
          ok: false,
          message: 'Room not found.',
        });
        return;
      }

      if (room.hostId !== socket.id) {
        callback?.({
          ok: false,
          message: 'Only the host can start the game.',
        });
        return;
      }

      clearRoomSpinTimer(roomCode);
      clearRoomChoiceTimer(roomCode);
      const result = startGame(roomCode);

      if (!result.ok) {
        callback?.(result);
        return;
      }

      io.to(roomCode).emit('room-updated', result.room);
      io.to(roomCode).emit('game-started', { room: result.room });

      callback?.({
        ok: true,
        room: result.room,
      });
    });

    socket.on('spin-bottle', ({ roomCode } = {}, callback) => {
      const room = getRoom(roomCode);

      if (!room) {
        callback?.({
          ok: false,
          message: 'Room not found.',
        });
        return;
      }

      if (room.hostId !== socket.id) {
        callback?.({
          ok: false,
          message: 'Only the host can spin the bottle.',
        });
        return;
      }

      const result = spinBottle(roomCode);

      if (!result.ok) {
        callback?.(result);
        return;
      }

      clearRoomSpinTimer(roomCode);
      io.to(roomCode).emit('room-updated', result.room);
      io.to(roomCode).emit('spin-started', {
        roomCode,
        rotation: result.room.gameState.spinnerRotation,
        duration: result.room.gameState.spinDuration,
      });

      const timer = setTimeout(() => {
        const finalizedRound = finalizeSpin(roomCode);
        roomSpinTimers.delete(roomCode);

        if (!finalizedRound) {
          return;
        }

        io.to(roomCode).emit('room-updated', finalizedRound.room);
        io.to(roomCode).emit('player-selected', {
          roomCode,
          player: finalizedRound.selectedPlayer,
          round: finalizedRound.room.gameState.round,
        });

        const choiceTimer = setTimeout(() => {
          const autoChoice = Math.random() > 0.5 ? 'truth' : 'dare';
          const autoResult = choosePromptType({
            roomCode,
            playerId: finalizedRound.selectedPlayer?.id,
            choice: autoChoice,
          });

          roomChoiceTimers.delete(roomCode);

          if (!autoResult.ok) {
            return;
          }

          io.to(roomCode).emit('room-updated', autoResult.room);
          io.to(roomCode).emit('prompt-revealed', {
            roomCode,
            player: autoResult.selectedPlayer,
            choice: autoChoice,
            prompt: autoResult.prompt,
            autoSelected: true,
          });
        }, getChoiceDuration());

        roomChoiceTimers.set(roomCode, choiceTimer);
      }, getSpinDuration());

      roomSpinTimers.set(roomCode, timer);

      callback?.({
        ok: true,
        room: result.room,
      });
    });

    socket.on('choose-option', ({ roomCode, choice } = {}, callback) => {
      clearRoomChoiceTimer(roomCode);
      const result = choosePromptType({
        roomCode,
        playerId: socket.id,
        choice,
      });

      if (!result.ok) {
        callback?.(result);
        return;
      }

      io.to(roomCode).emit('room-updated', result.room);
        io.to(roomCode).emit('prompt-revealed', {
          roomCode,
          player: result.selectedPlayer,
          choice,
          prompt: result.prompt,
          autoSelected: false,
        });

      callback?.({
        ok: true,
        room: result.room,
      });
    });

    socket.on('submit-round-result', ({ roomCode, action } = {}, callback) => {
      const result = resolveRound({
        roomCode,
        actorId: socket.id,
        action,
      });

      if (!result.ok) {
        callback?.(result);
        return;
      }

      io.to(roomCode).emit('room-updated', result.room);
      io.to(roomCode).emit('round-scored', {
        roomCode,
        player: result.selectedPlayer,
        action: result.action,
        points: result.points,
      });

      callback?.({
        ok: true,
        room: result.room,
      });
    });

    socket.on('next-round', ({ roomCode } = {}, callback) => {
      const room = getRoom(roomCode);

      if (!room) {
        callback?.({
          ok: false,
          message: 'Room not found.',
        });
        return;
      }

      if (room.hostId !== socket.id) {
        callback?.({
          ok: false,
          message: 'Only the host can move to the next round.',
        });
        return;
      }

      clearRoomSpinTimer(roomCode);
      clearRoomChoiceTimer(roomCode);
      const result = nextRound(roomCode);

      io.to(roomCode).emit('room-updated', result.room);
      io.to(roomCode).emit('round-reset', {
        roomCode,
        round: result.room.gameState.round,
      });

      callback?.({
        ok: true,
        room: result.room,
      });
    });

    socket.on('disconnect', () => {
      const result = removePlayer(socket.id);

      if (result?.deletedRoomCode) {
        clearRoomSpinTimer(result.deletedRoomCode);
        clearRoomChoiceTimer(result.deletedRoomCode);
      }

      if (!result?.room) {
        return;
      }

      if (result.interruptedRound) {
        clearRoomSpinTimer(result.room.code);
        clearRoomChoiceTimer(result.room.code);
      }
      io.to(result.room.code).emit('player-left', {
        playerName: result.removedPlayer.name,
      });
      io.to(result.room.code).emit('room-updated', result.room);
    });
  });
}
