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
      <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_28%,transparent_72%,rgba(255,255,255,0.025))]" />
        <div className="pointer-events-none absolute left-[-8rem] top-20 h-52 w-52 rounded-full bg-bubblegum/20 blur-3xl sm:h-72 sm:w-72" />
        <div className="pointer-events-none absolute right-[-8rem] top-28 h-56 w-56 rounded-full bg-neon/20 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute bottom-[-4rem] left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-aurora/10 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_65%)]" />

        <Navbar />

        <main className="relative z-10 mx-auto flex w-full max-w-[27.5rem] flex-1 flex-col px-4 pb-10 pt-1 sm:px-4">
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
