import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRoom } from '../context/RoomContext';
import { saveRoomSession } from '../lib/roomSession';

function JoinRoom() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { socket, setCurrentPlayer, setRoom } = useRoom();
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const invitedRoomCode = searchParams.get('roomCode');
    if (invitedRoomCode) {
      setRoomCode(invitedRoomCode.toUpperCase());
    }
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !roomCode.trim()) {
      setError('Please enter your name and room code.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    const normalizedRoomCode = roomCode.trim().toUpperCase();

    const clearListeners = () => {
      socket.off('room-joined', handleRoomJoined);
      socket.off('room-error', handleRoomError);
    };

    const handleRoomJoined = (response) => {
      clearListeners();
      console.log('[FriendSpin] room-joined received', response);
      setIsSubmitting(false);
      saveRoomSession({
        playerName: response.player.name,
        roomCode: response.room.code.toUpperCase(),
        playerId: response.player.id,
        isHost: false,
      });
      setCurrentPlayer(response.player);
      setRoom(response.room);
      console.log(
        `[FriendSpin] navigating to lobby /lobby/${response.room.code.toUpperCase()}`,
      );
      navigate(`/lobby/${response.room.code.toUpperCase()}`);
    };

    const handleRoomError = (response) => {
      clearListeners();
      setIsSubmitting(false);
      setError(response?.message || 'Unable to join that room.');
    };

    socket.once('room-joined', handleRoomJoined);
    socket.once('room-error', handleRoomError);
    console.log('[FriendSpin] join-room emitted', {
      name: name.trim(),
      roomCode: normalizedRoomCode,
    });
    socket.emit('join-room', {
      name: name.trim(),
      roomCode: normalizedRoomCode,
    });
  };

  return (
    <div className="mx-auto grid w-full max-w-2xl py-4 sm:py-8">
      <Card
        title="Join Room"
        subtitle="Bring your name and a room code to jump straight into your group's lobby."
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Your Name"
            placeholder="Enter your party name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            state={error ? 'error' : 'default'}
          />
          <Input
            label="Room Code"
            placeholder="ABCD12"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
            helperText="Room codes are shared by the player who created the room."
          />

          {error ? (
            <p className="rounded-[1.4rem] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm leading-7 text-slate-300">
              Joining keeps your room code in uppercase and takes you straight
              into the live lobby.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {isSubmitting ? (
              <LoadingSpinner label="Joining lobby..." />
            ) : (
              <p className="text-sm text-slate-400">Ready for instant room sync.</p>
            )}
            <Button type="submit" fullWidth disabled={isSubmitting} className="sm:w-auto">
              Join Room
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default JoinRoom;
