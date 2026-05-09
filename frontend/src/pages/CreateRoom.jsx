import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';
import ModeSelect from '../components/ModeSelect';
import { useLanguage } from '../context/LanguageContext';
import { useRoom } from '../context/RoomContext';
import { defaultGameMode, gameModes } from '../data/gameModes';
import { saveRoomSession } from '../lib/roomSession';

function CreateRoom() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { socket, setCurrentPlayer, setRoom } = useRoom();
  const [name, setName] = useState('');
  const [mode, setMode] = useState(defaultGameMode);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const localizedModes = useMemo(
    () =>
      gameModes.map((option) => ({
        ...option,
        label: t(`modes.${option.id}.label`),
        description: t(`modes.${option.id}.description`),
      })),
    [t],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError(t('create.errorMissingName'));
      return;
    }

    setError('');
    setIsSubmitting(true);

    const clearListeners = () => {
      socket.off('room-created', handleRoomCreated);
      socket.off('room-error', handleRoomError);
    };

    const handleRoomCreated = (response) => {
      clearListeners();
      setIsSubmitting(false);
      saveRoomSession({
        playerName: response.player.name,
        roomCode: response.room.code.toUpperCase(),
        playerId: response.player.id,
        isHost: true,
      });
      setCurrentPlayer(response.player);
      setRoom(response.room);
      navigate(`/lobby/${response.room.code.toUpperCase()}`);
    };

    const handleRoomError = (response) => {
      clearListeners();
      setIsSubmitting(false);
      setError(response?.message || 'Unable to create room right now.');
    };

    socket.once('room-created', handleRoomCreated);
    socket.once('room-error', handleRoomError);
    socket.emit('create-room', { name: name.trim(), mode });
  };

  return (
    <div className="w-full flex-1 py-4">
      <Card
        title={t('create.title')}
        subtitle={t('create.subtitle')}
        className="w-full"
      >
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
          {t('create.badge')}
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label={t('common.yourName')}
            placeholder={t('create.namePlaceholder')}
            value={name}
            onChange={(event) => setName(event.target.value)}
            state={error ? 'error' : 'default'}
          />
          <ModeSelect
            label={t('common.gameMode')}
            value={mode}
            options={localizedModes}
            onChange={(event) => setMode(event.target.value)}
          />

          {error ? (
            <p className="rounded-[1.4rem] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          {isSubmitting ? <LoadingSpinner label={t('create.loading')} /> : null}

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            className="min-h-[3.9rem] text-base"
          >
            {t('common.createRoom')}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default CreateRoom;
