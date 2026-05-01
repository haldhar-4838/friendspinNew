import { io } from "socket.io-client";

const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || 
  "https://friendspin-backend.onrender.com";

export const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  autoConnect: true, // important
});

export { SOCKET_SERVER_URL };