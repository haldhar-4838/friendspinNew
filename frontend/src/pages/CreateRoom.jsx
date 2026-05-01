import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';
import ModeSelect from '../components/ModeSelect';
import { useRoom } from '../context/RoomContext';
import { defaultGameMode, gameModes } from '../data/gameModes';
import { saveRoomSession } from '../lib/roomSession';

function CreateRoom() {
  const navigate = useNavigate();
  const { socket, setCurrentPlayer, setRoom } = useRoom();
  const [name, setName] = useState('');
  const [mode, setMode] = useState(defaultGameMode);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name before creating a room.');
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
    <div className="mx-auto grid w-full max-w-2xl py-8">
      <Card
        title="Create Room"
        subtitle="Pick a display name and open a new FriendSpin lobby for your group."
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Your Name"
            placeholder="Enter your party name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            helperText="This name will be shown to everyone in the lobby."
          />
          <ModeSelect
            label="Game Mode"
            value={mode}
            options={gameModes}
            onChange={(event) => setMode(event.target.value)}
          />

          {error ? (
            <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {isSubmitting ? <LoadingSpinner label="Creating your room..." /> : <span />}
            <Button type="submit" fullWidth={false} disabled={isSubmitting}>
              Create Room
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CreateRoom;
