import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

function Home() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 items-center py-4 sm:py-8">
      <Card className="w-full overflow-hidden">
        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.9rem] bg-gradient-to-br from-bubblegum via-neon to-aurora text-2xl font-bold text-white shadow-[0_24px_60px_-28px_rgba(139,92,246,0.95)]">
            FS
          </div>

          <div className="space-y-2">
            <p className="section-kicker">Party Game Night</p>
            <h1 className="font-display text-[2.3rem] font-bold tracking-[-0.05em] text-white sm:text-[2.8rem]">
              FriendSpin
            </h1>
            <p className="text-sm leading-6 text-slate-300 sm:text-base">
              Truth or Dare with friends
            </p>
          </div>

          <div className="grid w-full gap-3">
            <Link to="/create-room" className="w-full">
              <Button className="min-h-[3.9rem] w-full text-base">Create Room</Button>
            </Link>
            <Link to="/join-room" className="w-full">
              <Button variant="secondary" className="min-h-[3.9rem] w-full text-base">
                Join Room
              </Button>
            </Link>
          </div>

          <p className="text-sm text-slate-400">
            Start a room or jump in with a code.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Home;
