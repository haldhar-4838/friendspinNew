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
    <div className="w-full flex-1 py-4">
      <Card
        title="Join Room"
        subtitle="Enter your name and room code to jump straight into the lobby."
        className="w-full"
      >
        <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
          Join the party
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Your Name"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            state={error ? 'error' : 'default'}
          />
          <Input
            label="Room Code"
            placeholder="ABCD12"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
          />

          {error ? (
            <p className="rounded-[1.4rem] border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          {isSubmitting ? <LoadingSpinner label="Joining room..." /> : null}

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            className="min-h-[3.9rem] text-base"
          >
            Join Room
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default JoinRoom;
