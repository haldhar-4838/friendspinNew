import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateRoom from './pages/CreateRoom';
import GameRoom from './pages/GameRoom';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import Lobby from './pages/Lobby';

function App() {
  return (
    <div className="min-h-screen bg-midnight bg-party-grid bg-party-hero text-white">
      <div className="relative min-h-screen overflow-x-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.16),transparent_58%)]" />
        <div className="pointer-events-none absolute left-[-10rem] top-32 h-64 w-64 rounded-full bg-bubblegum/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-[-8rem] h-64 w-64 rounded-full bg-aurora/10 blur-3xl" />
        <Navbar />
        <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-10 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-room" element={<CreateRoom />} />
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
