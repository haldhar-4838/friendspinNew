import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { initializeSocket } from './socket/index.js';

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  }),
);
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({
    ok: true,
    service: 'friendspin-backend',
  });
});

initializeSocket(io);

server.listen(PORT, () => {
  console.log(`FriendSpin backend running on http://localhost:${PORT}`);
});
