import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateRoom from './pages/CreateRoom';
import GameRoom from './pages/GameRoom';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import Lobby from './pages/Lobby';

function App() {
  return (
    <div className="min-h-screen bg-midnight text-white">
      <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.22),transparent_30%),radial-gradient(circle_at_left,rgba(236,72,153,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_24%),linear-gradient(180deg,#0b1530_0%,#040816_55%,#020617_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_30%,transparent_70%,rgba(255,255,255,0.02))]" />
        <div className="pointer-events-none absolute left-[-7rem] top-24 h-48 w-48 rounded-full bg-bubblegum/20 blur-3xl sm:h-64 sm:w-64" />
        <div className="pointer-events-none absolute right-[-7rem] top-36 h-56 w-56 rounded-full bg-neon/20 blur-3xl sm:h-72 sm:w-72" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-aurora/10 blur-3xl sm:h-72 sm:w-72" />

        <Navbar />

        <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 pb-10 pt-1 sm:px-6 sm:pt-2 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-room" element={<CreateRoom />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/join-room" element={<JoinRoom />} />
            <Route path="/lobby/:roomCode" element={<Lobby />} />
            <Route path="/game/:roomCode" element={<GameRoom />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
