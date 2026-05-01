import { availableModes, darePrompts, truthPrompts } from './gamePrompts.js';

const rooms = new Map();
const SPIN_DURATION_MS = 4200;
const CHOICE_DURATION_MS = 10000;
const PLAYER_AVATARS = ['😎', '😂', '🔥', '😺', '🤩', '🦄', '🐼', '🐯', '🕺', '💃', '🚀', '🎯', '🎉', '🌈', '🍕', '🦋'];

function normalizeRoomCode(roomCode = '') {
  return roomCode.trim().toUpperCase();
}

function normalizeMode(mode = '') {
  return availableModes.includes(mode) ? mode : 'normal';
}

function createInitialGameState() {
  // Phase 2 can extend this shared round state with timers, scoring, and custom decks.
  return {
    round: 0,
    phase: 'waiting',
    spinnerRotation: 0,
    spinDuration: SPIN_DURATION_MS,
    spinStartedAt: null,
    pendingSelectedPlayerId: null,
    selectedPlayerId: null,
    selectedChoice: null,
    currentPrompt: null,
    choiceDurationMs: CHOICE_DURATION_MS,
    choiceDeadlineAt: null,
    roundResult: null,
  };
}

function generateRoomCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';

  for (let index = 0; index < 6; index += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return code;
}

function createUniqueRoomCode() {
  let roomCode = normalizeRoomCode(generateRoomCode());

  while (rooms.has(roomCode)) {
    roomCode = normalizeRoomCode(generateRoomCode());
  }

  return roomCode;
}

function buildPlayer({ id, name, isHost = false }) {
  const avatarIndex = Math.abs(
    Array.from(id).reduce((sum, character) => sum + character.charCodeAt(0), 0),
  ) % PLAYER_AVATARS.length;

  return {
    id,
    name,
    isHost,
    avatar: PLAYER_AVATARS[avatarIndex],
    score: 0,
  };
}

export function createPlayerProfile({ id, name, isHost = false }) {
  return buildPlayer({ id, name, isHost });
}

export function createRoom({ hostSocketId, hostName, mode }) {
  const roomCode = normalizeRoomCode(createUniqueRoomCode());
  const host = buildPlayer({
    id: hostSocketId,
    name: hostName,
    isHost: true,
  });

  const room = {
    code: roomCode,
    hostId: hostSocketId,
    status: 'lobby',
    mode: normalizeMode(mode),
    players: [host],
    gameState: createInitialGameState(),
  };

  rooms.set(roomCode, room);

  console.log('[FriendSpin] room players after create:', room.players);

  return {
    room,
    player: host,
  };
}

export function joinRoom({ socketId, roomCode, playerName }) {
  const normalizedRoomCode = normalizeRoomCode(roomCode);
  const room = rooms.get(normalizedRoomCode);

  if (!room) {
    return {
      ok: false,
      message: 'Room not found.',
    };
  }

  if (room.status === 'playing') {
    return {
      ok: false,
      message: 'This room is already in a live game.',
    };
  }

  const alreadyJoined = room.players.find((player) => player.id === socketId);
  if (alreadyJoined) {
    return {
      ok: true,
      room,
      player: alreadyJoined,
    };
  }

  const player = buildPlayer({
    id: socketId,
    name: playerName,
  });

  room.players.push(player);

  console.log('[FriendSpin] room players after join:', room.players);

  return {
    ok: true,
    room,
    player,
  };
}

export function startGame(roomCode) {
  const room = rooms.get(normalizeRoomCode(roomCode));

  if (!room) {
    return {
      ok: false,
      message: 'Room not found.',
    };
  }

  if (room.players.length < 2) {
    return {
      ok: false,
      message: 'At least 2 players are required to start the game.',
    };
  }

  room.status = 'playing';
  room.gameState = createInitialGameState();
  return {
    ok: true,
    room,
  };
}

export function spinBottle(roomCode) {
  const room = rooms.get(normalizeRoomCode(roomCode));

  if (!room) {
    return {
      ok: false,
      message: 'Room not found.',
    };
  }

  if (room.players.length < 2) {
    return {
      ok: false,
      message: 'At least 2 players are required to spin.',
    };
  }

  if (room.status !== 'playing') {
    return {
      ok: false,
      message: 'The game has not started yet.',
    };
  }

  if (room.gameState.phase !== 'waiting') {
    return {
      ok: false,
      message: 'Finish the current round before spinning again.',
    };
  }

  const targetIndex = Math.floor(Math.random() * room.players.length);
  const targetPlayer = room.players[targetIndex];
  const currentRotation = room.gameState.spinnerRotation;
  const currentAngle = ((currentRotation % 360) + 360) % 360;
  const segmentAngle = 360 / room.players.length;
  const targetAngle = segmentAngle * targetIndex;
  const deltaAngle = (targetAngle - currentAngle + 360) % 360;
  const nextRotation = currentRotation + 1800 + deltaAngle;

  room.gameState = {
    ...room.gameState,
    round: room.gameState.round + 1,
    phase: 'spinning',
    spinnerRotation: nextRotation,
    spinDuration: SPIN_DURATION_MS,
    spinStartedAt: Date.now(),
    pendingSelectedPlayerId: targetPlayer.id,
    selectedPlayerId: null,
    selectedChoice: null,
    currentPrompt: null,
  };

  return {
    ok: true,
    room,
    targetPlayer,
  };
}

export function finalizeSpin(roomCode) {
  const room = rooms.get(normalizeRoomCode(roomCode));

  if (!room || room.gameState.phase !== 'spinning') {
    return null;
  }

  const selectedPlayerId = room.gameState.pendingSelectedPlayerId;
  const selectedPlayer =
    room.players.find((player) => player.id === selectedPlayerId) || null;

  room.gameState = {
    ...room.gameState,
    phase: 'choice',
    spinStartedAt: null,
    pendingSelectedPlayerId: null,
    selectedPlayerId,
    choiceDeadlineAt: Date.now() + CHOICE_DURATION_MS,
  };

  return {
    room,
    selectedPlayer,
  };
}

function pickRandomPrompt(prompts, previousPrompt) {
  if (!prompts.length) {
    return 'Is mode ke liye safe prompt abhi ready nahi hai. Next round try karo.';
  }

  if (prompts.length === 1) {
    return prompts[0];
  }

  let prompt = prompts[Math.floor(Math.random() * prompts.length)];

  while (prompt === previousPrompt) {
    prompt = prompts[Math.floor(Math.random() * prompts.length)];
  }

  return prompt;
}

export function choosePromptType({ roomCode, playerId, choice }) {
  const room = rooms.get(normalizeRoomCode(roomCode));

  if (!room) {
    return {
      ok: false,
      message: 'Room not found.',
    };
  }

  if (room.gameState.phase !== 'choice') {
    return {
      ok: false,
      message: 'This round is not ready for a choice yet.',
    };
  }

  if (room.gameState.selectedPlayerId !== playerId) {
    return {
      ok: false,
      message: 'Only the selected player can choose Truth or Dare.',
    };
  }

  if (!['truth', 'dare'].includes(choice)) {
    return {
      ok: false,
      message: 'Choose either truth or dare.',
    };
  }

  const mode = normalizeMode(room.mode);
  const promptBank = choice === 'truth' ? truthPrompts : darePrompts;
  const prompts = promptBank[mode] || promptBank.normal || [];
  const prompt = pickRandomPrompt(prompts, room.gameState.currentPrompt);

  room.gameState = {
    ...room.gameState,
    phase: 'prompt',
    selectedChoice: choice,
    currentPrompt: prompt,
    choiceDeadlineAt: null,
    roundResult: null,
  };

  return {
    ok: true,
    room,
    prompt,
    selectedPlayer:
      room.players.find((player) => player.id === room.gameState.selectedPlayerId) ||
      null,
  };
}

export function resolveRound({ roomCode, actorId, action }) {
  const room = rooms.get(normalizeRoomCode(roomCode));

  if (!room) {
    return {
      ok: false,
      message: 'Room not found.',
    };
  }

  if (!['completed', 'skipped'].includes(action)) {
    return {
      ok: false,
      message: 'Invalid round action.',
    };
  }

  if (!['prompt', 'resolved'].includes(room.gameState.phase)) {
    return {
      ok: false,
      message: 'No active challenge to score right now.',
    };
  }

  if (room.gameState.roundResult) {
    return {
      ok: false,
      message: 'This round has already been scored.',
    };
  }

  const selectedPlayer =
    room.players.find((player) => player.id === room.gameState.selectedPlayerId) ||
    null;

  if (!selectedPlayer) {
    return {
      ok: false,
      message: 'Selected player not found.',
    };
  }

  const isHostAction = room.hostId === actorId;
  if (selectedPlayer.id !== actorId && !isHostAction) {
    return {
      ok: false,
      message: 'Only the selected player or host can update the round result.',
    };
  }

  const points =
    action === 'skipped'
      ? -5
      : room.gameState.selectedChoice === 'dare'
        ? 20
        : 10;

  selectedPlayer.score += points;
  room.gameState = {
    ...room.gameState,
    phase: 'resolved',
    roundResult: {
      action,
      points,
      playerId: selectedPlayer.id,
    },
  };

  return {
    ok: true,
    room,
    selectedPlayer,
    points,
    action,
  };
}

export function nextRound(roomCode) {
  const room = rooms.get(normalizeRoomCode(roomCode));

  if (!room) {
    return {
      ok: false,
      message: 'Room not found.',
    };
  }

  if (!['prompt', 'resolved'].includes(room.gameState.phase)) {
    return {
      ok: false,
      message: 'The round is not ready to advance yet.',
    };
  }

  room.gameState = {
    ...room.gameState,
    phase: 'waiting',
    spinStartedAt: null,
    pendingSelectedPlayerId: null,
    selectedPlayerId: null,
    selectedChoice: null,
    currentPrompt: null,
    choiceDeadlineAt: null,
    roundResult: null,
  };

  return {
    ok: true,
    room,
  };
}

export function getRoom(roomCode) {
  return rooms.get(normalizeRoomCode(roomCode)) || null;
}

export function removePlayer(socketId) {
  for (const room of rooms.values()) {
    const playerIndex = room.players.findIndex((player) => player.id === socketId);

    if (playerIndex === -1) {
      continue;
    }

    const [removedPlayer] = room.players.splice(playerIndex, 1);

    if (room.players.length === 0) {
      rooms.delete(room.code);
      return { room: null, removedPlayer, deletedRoomCode: room.code };
    }

    if (room.hostId === socketId) {
      room.hostId = room.players[0].id;
      room.players[0].isHost = true;
    }

    const interruptedRound =
      room.gameState.pendingSelectedPlayerId === socketId ||
      room.gameState.selectedPlayerId === socketId;

    if (
      room.gameState.pendingSelectedPlayerId === socketId ||
      room.gameState.selectedPlayerId === socketId
    ) {
      room.gameState = {
        ...room.gameState,
        phase: 'waiting',
        spinStartedAt: null,
        pendingSelectedPlayerId: null,
        selectedPlayerId: null,
        selectedChoice: null,
        currentPrompt: null,
        choiceDeadlineAt: null,
        roundResult: null,
      };
    }

    return {
      room,
      removedPlayer,
      deletedRoomCode: null,
      interruptedRound,
    };
  }

  return null;
}

export function getSpinDuration() {
  return SPIN_DURATION_MS;
}

export function getChoiceDuration() {
  return CHOICE_DURATION_MS;
}

export function getAvailableRoomCodes() {
  return Array.from(rooms.keys());
}
