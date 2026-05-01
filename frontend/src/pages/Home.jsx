import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import GameCard from '../components/GameCard';

function Home() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <section className="space-y-8 py-8 sm:py-12">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
          Online Multiplayer Party Game
        </div>
        <div className="space-y-5">
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-tight sm:text-6xl">
            Start the room,
            <span className="headline-gradient"> spin up the fun,</span>
            keep the party moving.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            FriendSpin gives your group a fast way to create a room, invite
            friends, and jump into a live Truth or Dare party session.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link to="/create-room">
            <Button className="w-full sm:w-auto">Create a Room</Button>
          </Link>
          <Link to="/join-room">
            <Button variant="secondary" className="w-full sm:w-auto">
              Join with a Code
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-5">
        <Card
          title="Phase 1 Ready"
          subtitle="This setup includes frontend routing, socket wiring, room presence, and a polished lobby experience."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <GameCard
              title="Live Lobby"
              description="Share room codes, sync players, and keep everyone in one place before the game starts."
              accent="from-bubblegum to-flare"
            />
            <GameCard
              title="Socket Powered"
              description="Create rooms and join them instantly with real-time updates from the backend."
              accent="from-aurora to-neon"
            />
          </div>
        </Card>
      </section>
    </div>
  );
}

export default Home;
