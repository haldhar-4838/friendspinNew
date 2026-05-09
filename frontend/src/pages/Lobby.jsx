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
import { useLanguage } from '../context/LanguageContext';
import { useRoom } from '../context/RoomContext';
import { gameModes } from '../data/gameModes';

function Lobby() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { roomCode } = useParams();
  const normalizedRoomCode = roomCode?.toUpperCase() || '';
  const { room, currentPlayer, socket, setRoom } = useRoom();
  const [statusMessage, setStatusMessage] = useState('');
  const [players, setPlayers] = useState(room?.players || []);
  const currentPlayerInRoom =
    players.find((player) => player.id === currentPlayer?.id) || null;
  const modeLabel = t(`modes.${room?.mode || gameModes[0].id}.label`);

  useEffect(() => {
    const handlePlayerJoined = ({ player }) => {
      setStatusMessage(t('lobby.playerJoined', { name: player.name }));
    };
    const handlePlayerLeft = ({ playerName }) => {
      setStatusMessage(t('lobby.playerLeft', { name: playerName }));
    };
    const handleRoomUpdated = (syncedRoom) => {
      setRoom(syncedRoom);
      setPlayers(syncedRoom.players || []);
    };
    const handleGameStarted = ({ room: startedRoom }) => {
      console.log('[TruthDare] game-started received', startedRoom);
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
  }, [navigate, setRoom, socket, t]);

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
          title={t('lobby.syncingTitle')}
          subtitle={t('lobby.syncingSubtitle')}
          className="w-full"
        >
          <LoadingSpinner label={t('lobby.loading')} />
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-3 py-3">
      <Card
        title={t('lobby.title')}
        subtitle={t('lobby.subtitle')}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="status-pill border-bubblegum/25 bg-bubblegum/10 text-bubblegum">
              {modeLabel}
            </span>
            <span className="status-pill border-white/10 bg-white/[0.05] text-slate-300">
              {t('lobby.playerCount', { count: players.length })}
            </span>
            {currentPlayerInRoom?.isHost ? (
              <span className="status-pill border-aurora/25 bg-aurora/10 text-aurora">
                {t('lobby.hostControlsStart')}
              </span>
            ) : null}
          </div>

          <div className="surface-muted p-4">
            <p className="section-kicker">{t('lobby.roomStatus')}</p>
            <h3 className="mt-2 font-display text-[1.45rem] font-semibold tracking-[-0.04em] text-white">
              {players.length < 2
                ? t('lobby.waitingForPlayers')
                : t('lobby.roomReady')}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {currentPlayerInRoom?.isHost
                ? t('lobby.hostRoomStatus')
                : t('lobby.guestRoomStatus')}
            </p>
          </div>

          <RoomCodeBox roomCode={room.code} />

          <div className="grid gap-3">
            <ShareButton roomCode={room.code} />
            <WhatsAppShareButton roomCode={room.code} />
          </div>

          {currentPlayerInRoom?.isHost ? (
            <Button
              onClick={handleStartGame}
              disabled={players.length < 2}
              className="min-h-[3.9rem] w-full text-base"
            >
              {t('lobby.startGame')}
            </Button>
          ) : (
            <div className="surface-muted px-4 py-3 text-sm leading-6 text-slate-300">
              {t('lobby.waitingHostStart')}
            </div>
          )}

          <div className="surface-muted px-4 py-3 text-sm leading-6 text-slate-300">
            {statusMessage ||
              (currentPlayerInRoom?.isHost
                ? players.length < 2
                  ? t('lobby.needTwoPlayers')
                  : t('lobby.everyoneIn')
                : t('lobby.guestWaiting'))}
          </div>
        </div>
      </Card>

      <Card
        title={t('common.players')}
        subtitle={t('lobby.playersInRoom', { count: players.length })}
      >
        <PlayerList players={players} currentPlayerId={currentPlayer?.id} variant="chips" />

        <div className="mt-5 border-t border-white/10 pt-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="section-kicker">{t('common.leaderboard')}</p>
            <p className="text-xs text-slate-500">{t('lobby.compactLiveScores')}</p>
          </div>
          <Leaderboard players={players} compact />
        </div>
      </Card>
    </div>
  );
}

export default Lobby;
