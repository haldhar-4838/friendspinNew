import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

function Home() {
  return (
    <div className="flex justify-center pt-1 sm:pt-2 lg:min-h-[calc(100vh-10rem)] lg:items-center">
      <Card className="w-full max-w-md">
        <div className="flex flex-col items-center gap-5 text-center sm:gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-bubblegum via-flare to-aurora text-xl font-bold text-white shadow-party sm:h-20 sm:w-20 sm:rounded-[1.75rem] sm:text-2xl">
            FS
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-[2rem] font-bold tracking-[-0.04em] text-white sm:text-4xl">
              FriendSpin
            </h1>
            <p className="text-sm leading-6 text-slate-300 sm:text-base">
              Play Truth or Dare with friends
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
