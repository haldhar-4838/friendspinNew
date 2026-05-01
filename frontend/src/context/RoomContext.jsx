import { createContext, useContext, useEffect, useState } from 'react';
import { readRoomSession, saveRoomSession } from '../lib/roomSession';
import { socket } from '../lib/socket';

const RoomContext = createContext(null);

export function RoomProvider({ children }) {
  const [room, setRoom] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const session = readRoomSession();

    if (!session) {
      return null;
    }

    return {
      id: session.playerId,
      name: session.playerName,
      isHost: session.isHost,
    };
  });
  const [connectionState, setConnectionState] = useState('disconnected');

  useEffect(() => {
    const handleConnect = () => setConnectionState('connected');
    const handleDisconnect = () => setConnectionState('disconnected');
    const handleRoomUpdated = (updatedRoom) => {
      setRoom(updatedRoom);
      setCurrentPlayer((previousPlayer) => {
        if (!previousPlayer) {
          return previousPlayer;
        }

        return (
          updatedRoom.players.find((player) => player.id === previousPlayer.id) ||
          previousPlayer
        );
      });
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('room-updated', handleRoomUpdated);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('room-updated', handleRoomUpdated);
    };
  }, []);

  useEffect(() => {
    if (!currentPlayer) {
      return;
    }

    saveRoomSession({
      playerName: currentPlayer.name,
      roomCode: room?.code || readRoomSession()?.roomCode || '',
      playerId: currentPlayer.id,
      isHost: currentPlayer.isHost,
    });
  }, [currentPlayer, room?.code]);

  const value = {
    room,
    setRoom,
    currentPlayer,
    setCurrentPlayer,
    socket,
    connectionState,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

export function useRoom() {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }

  return context;
}
