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
      <div className="mx-auto flex min-h-[50vh] w-full max-w-md items-center justify-center">
        <Card
          title="Lobby"
          subtitle="Syncing the latest room state."
          className="w-full"
        >
          <LoadingSpinner label="Loading room..." />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 py-3 sm:py-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
      <Card
        title="Lobby"
        subtitle="Invite everyone, keep an eye on the room, and start when ready."
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="status-pill border-bubblegum/25 bg-bubblegum/10 text-bubblegum">
              {modeLabel}
            </span>
            <span className="status-pill border-white/10 bg-white/[0.05] text-slate-300">
              {players.length} player{players.length === 1 ? '' : 's'}
            </span>
            {currentPlayerInRoom?.isHost ? (
              <span className="status-pill border-aurora/25 bg-aurora/10 text-aurora">
                Host controls start
              </span>
            ) : null}
          </div>

          <RoomCodeBox roomCode={room.code} />

          <div className="grid gap-3 sm:grid-cols-2">
            <ShareButton roomCode={room.code} />
            <WhatsAppShareButton roomCode={room.code} />
          </div>

          {currentPlayerInRoom?.isHost ? (
            <Button
              onClick={handleStartGame}
              disabled={players.length < 2}
              className="min-h-[3.9rem] w-full text-base"
            >
              Start Game
            </Button>
          ) : (
            <div className="surface-muted px-4 py-3 text-sm leading-6 text-slate-300">
              Waiting for the host to start the game.
            </div>
          )}

          <div className="surface-muted px-4 py-3 text-sm leading-6 text-slate-300">
            {statusMessage ||
              (currentPlayerInRoom?.isHost
                ? players.length < 2
                  ? 'You need at least 2 players before the game can begin.'
                  : 'Everyone is in. Start whenever your group is ready.'
                : 'Stay here while new players join and the host gets ready.')}
          </div>
        </div>
      </Card>

      <Card
        title="Players"
        subtitle={`${players.length} player${players.length === 1 ? '' : 's'} in the room.`}
      >
        <PlayerList players={players} currentPlayerId={currentPlayer?.id} variant="chips" />

        <div className="mt-5 border-t border-white/10 pt-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="section-kicker">Leaderboard</p>
            <p className="text-xs text-slate-500">Compact live scores</p>
          </div>
          <Leaderboard players={players} compact />
        </div>
      </Card>
    </div>
  );
}

export default Lobby;
