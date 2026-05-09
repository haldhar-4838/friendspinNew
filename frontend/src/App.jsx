import { Navigate, Route, Routes } from 'react-router-dom';
import FloatingHearts from './components/FloatingHearts';
import LanguageGate from './components/LanguageGate';
import Navbar from './components/Navbar';
import { useLanguage } from './context/LanguageContext';
import CreateRoom from './pages/CreateRoom';
import GameRoom from './pages/GameRoom';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import Lobby from './pages/Lobby';

function App() {
  const { hasSelectedLanguage, language } = useLanguage();

  return (
    <div className={['min-h-screen bg-midnight text-white', language === 'hi' ? 'lang-hi' : ''].join(' ')}>
      <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_24%,transparent_72%,rgba(255,255,255,0.02))]" />
        <div className="pointer-events-none absolute left-[-8rem] top-14 h-56 w-56 rounded-full bg-bubblegum/18 blur-3xl" />
        <div className="pointer-events-none absolute right-[-8rem] top-24 h-56 w-56 rounded-full bg-neon/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-5rem] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-red-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_68%)]" />
        <FloatingHearts />

        <Navbar />

        <main className="relative z-10 mx-auto flex w-full max-w-[26.5rem] flex-1 flex-col px-3 pb-8 pt-1 sm:max-w-[27.5rem] sm:px-4 sm:pb-10">
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

        {!hasSelectedLanguage ? <LanguageGate /> : null}
      </div>
    </div>
  );
}

export default App;
