import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

function Home() {
  return (
    <div className="home-stage relative mx-auto flex min-h-[calc(100vh-9rem)] w-full flex-1 items-center justify-center py-4 sm:min-h-[calc(100vh-10rem)] sm:py-8">
      <div className="home-scene pointer-events-none absolute inset-[-2.5rem] overflow-hidden">
        <div className="home-scene-grid" />
        <div className="home-gradient-layer" />
        <div className="home-blob home-blob-1" />
        <div className="home-blob home-blob-2" />
        <div className="home-blob home-blob-3" />
        <div className="home-blob home-blob-4" />
        <div className="home-blob home-blob-5" />
        <span className="home-confetti home-confetti-1" />
        <span className="home-confetti home-confetti-2" />
        <span className="home-confetti home-confetti-3" />
        <span className="home-confetti home-confetti-4" />
        <span className="home-confetti home-confetti-5" />
        <span className="home-confetti home-confetti-6" />
        <span className="home-particle home-particle-1" />
        <span className="home-particle home-particle-2" />
        <span className="home-particle home-particle-3" />
        <span className="home-particle home-particle-4" />
        <span className="home-particle home-particle-5" />
      </div>

      <Card className="home-hero-card relative z-10 w-full max-w-md overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_70%)] blur-2xl" />

        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="home-entrance" style={{ animationDelay: '40ms' }}>
            <div className="home-logo-orb flex h-20 w-20 items-center justify-center rounded-[1.9rem] bg-gradient-to-br from-bubblegum via-neon to-aurora text-2xl font-bold text-white shadow-[0_24px_60px_-28px_rgba(139,92,246,0.95)]">
              FS
            </div>
          </div>

          <div className="home-entrance space-y-2" style={{ animationDelay: '120ms' }}>
            <h1 className="font-display text-[2.3rem] font-bold tracking-[-0.05em] text-white sm:text-[2.8rem]">
              FriendSpin
            </h1>
            <p className="text-sm leading-6 text-slate-300 sm:text-base">
              Truth or Dare with friends
            </p>
          </div>

          <div className="grid w-full gap-3">
            <Link
              to="/create-room"
              className="home-entrance w-full"
              style={{ animationDelay: '200ms' }}
            >
              <Button className="min-h-[3.9rem] w-full text-base">Create Room</Button>
            </Link>
            <Link
              to="/join-room"
              className="home-entrance w-full"
              style={{ animationDelay: '280ms' }}
            >
              <Button variant="secondary" className="min-h-[3.9rem] w-full text-base">
                Join Room
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Home;
