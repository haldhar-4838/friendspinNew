import { Link } from 'react-router-dom';
import Button from '../components/Button';

function Home() {
  return (
    <div className="home-stage relative mx-auto flex min-h-[calc(100vh-5rem)] w-full flex-1 items-center justify-center py-2 sm:min-h-[calc(100vh-6rem)] sm:py-4">
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

      <section className="home-launch-panel relative z-10 w-full max-w-md overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_70%)] blur-2xl" />

        <div className="relative flex flex-col gap-5 text-left sm:gap-6">
          <div className="home-entrance" style={{ animationDelay: '60ms' }}>
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
              Party Mode
            </div>
          </div>

          <div className="home-entrance space-y-3" style={{ animationDelay: '120ms' }}>
            <h1 className="home-launch-title font-display text-[2.85rem] font-bold leading-[0.92] tracking-[-0.07em] text-white sm:text-[4rem]">
              Spin. Laugh. Dare.
            </h1>
            <p className="max-w-[22rem] text-sm leading-6 text-slate-300 sm:text-base">
              Play Truth or Dare with friends
            </p>
          </div>

          <div className="home-button-stack grid gap-3">
            <Link
              to="/create-room"
              className="home-entrance w-full"
              style={{ animationDelay: '200ms' }}
            >
              <Button className="min-h-[4rem] w-full rounded-[1.4rem] text-base">
                Create Room
              </Button>
            </Link>
            <Link
              to="/join-room"
              className="home-entrance w-full"
              style={{ animationDelay: '280ms' }}
            >
              <Button
                variant="secondary"
                className="min-h-[4rem] w-full rounded-[1.4rem] text-base"
              >
                Join Room
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
