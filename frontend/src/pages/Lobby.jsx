import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Leaderboard from '../components/Leaderboard';
import LoadingSpinner from '../components/LoadingSpinner';
import PlayerList from '../components/PlayerList';
import RoomCodeBox from '../components/RoomCodeBox';
import ShareButton from '../components/ShareButton';
import WhatsAppShareButton from '../components/WhatsAppShareButton';
import { useRoom } from '../context/RoomContext';
import { gameModes } from '../data/gameModes';

function Lobby() {
  const navigate = useNavigate();
  const { roomCode } = useParams();
  const normalizedRoomCode = roomCode?.toUpperCase() || '';
  const { room, currentPlayer, socket, setRoom } = useRoom();
  const [statusMessage, setStatusMessage] = useState('');
  const [players, setPlayers] = useState(room?.players || []);
  const currentPlayerInRoom =
    players.find((player) => player.id === currentPlayer?.id) || null;
  const modeLabel =
    gameModes.find((mode) => mode.id === room?.mode)?.label || 'Normal Mode';

  useEffect(() => {
    const handlePlayerJoined = ({ player }) => {
      setStatusMessage(`${player.name} joined the room.`);
    };
    const handlePlayerLeft = ({ playerName }) => {
      setStatusMessage(`${playerName} left the room.`);
    };
    const handleRoomUpdated = (syncedRoom) => {
      setRoom(syncedRoom);
      setPlayers(syncedRoom.players || []);
    };
    const handleGameStarted = ({ room: startedRoom }) => {
      console.log('[FriendSpin] game-started received', startedRoom);
      setRoom(startedRoom);
      navigate(`/game/${startedRoom.code}`);
    };

    socket.on('player-joined', handlePlayerJoined);
    socket.on('player-left', handlePlayerLeft);
    socket.on('room-updated', handleRoomUpdated);
    socket.on('game-started', handleGameStarted);

    return () => {
      socket.off('player-joined', handlePlayerJoined);
      socket.off('player-left', handlePlayerLeft);
      socket.off('room-updated', handleRoomUpdated);
      socket.off('game-started', handleGameStarted);
    };
  }, [navigate, setRoom, socket]);

  useEffect(() => {
    setPlayers(room?.players || []);
  }, [room]);

  useEffect(() => {
    if (room?.code === normalizedRoomCode) {
      return;
    }

    if (!normalizedRoomCode) {
      return;
    }

    socket.emit('get-room', { roomCode: normalizedRoomCode });
  }, [normalizedRoomCode, room?.code, socket]);

  useEffect(() => {
    if (room?.status === 'playing') {
      navigate(`/game/${room.code}`);
    }
  }, [navigate, room]);

  const handleStartGame = () => {
    if (!room) {
      return;
    }

    socket.emit('start-game', { roomCode: room.code }, (response) => {
      if (!response?.ok) {
        setStatusMessage(response?.message || 'Unable to start the game yet.');
      }
    });
  };

  if (!room || room.code !== normalizedRoomCode) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-2xl items-center justify-center">
        <Card
          title="Lobby Loading"
          subtitle="We are waiting for the room state to sync with the backend."
          className="w-full"
        >
          <LoadingSpinner label="Syncing room..." />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 py-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card
        title="Lobby"
        subtitle="Invite players, confirm everyone is here, then start the game."
      >
        <div className="space-y-5">
          <RoomCodeBox roomCode={room.code} />
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-bubblegum/20 bg-bubblegum/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-bubblegum">
              {modeLabel}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
              {players.length} players
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ShareButton roomCode={room.code} />
            <WhatsAppShareButton roomCode={room.code} />
            {currentPlayerInRoom?.isHost ? (
              <Button
                variant="secondary"
                onClick={handleStartGame}
                disabled={players.length < 2}
                className="w-full"
              >
                Start Game
              </Button>
            ) : null}
          </div>

          {statusMessage ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              {statusMessage}
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              {currentPlayerInRoom?.isHost
                ? players.length < 2
                  ? 'You need at least 2 players in the room before starting.'
                  : 'You are the host. Start the game when everyone is ready.'
                : 'Waiting for the host to start the game.'}
            </p>
          )}
        </div>
      </Card>

      <div className="grid gap-6">
        <Card
          title="Players"
          subtitle={`${players.length} player${players.length === 1 ? '' : 's'} currently in the room.`}
        >
          <PlayerList
            players={players}
            currentPlayerId={currentPlayer?.id}
          />
        </Card>
        <Card
          title="Leaderboard"
          subtitle="Truth completed +10, Dare completed +20, Skip -5."
        >
          <Leaderboard players={players} />
        </Card>
      </div>
    </div>
  );
}

export default Lobby;
