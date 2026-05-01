import { io } from 'socket.io-client';

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:4000';

export const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false,
});

export { SOCKET_SERVER_URL };
