import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

function Home() {
  return (
    <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center py-6 sm:py-10">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-bubblegum via-flare to-aurora text-2xl font-bold text-white shadow-party">
            FS
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
              FriendSpin
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Party Room
            </p>
          </div>

          <div className="grid w-full gap-3">
            <Link to="/create-room" className="w-full">
              <Button className="w-full">Create Room</Button>
            </Link>
            <Link to="/join-room" className="w-full">
              <Button variant="secondary" className="w-full">
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
