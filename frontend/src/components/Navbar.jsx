import { Link, NavLink } from 'react-router-dom';

const linkStyles = ({ isActive }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-white/10 text-white'
      : 'text-slate-300 hover:bg-white/5 hover:text-white',
  ].join(' ');

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-bubblegum via-flare to-aurora text-lg font-bold text-white shadow-party">
            FS
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-wide text-white">
              FriendSpin
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Party Room Hub
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/create-room" className={linkStyles}>
            Create Room
          </NavLink>
          <NavLink to="/join-room" className={linkStyles}>
            Join Room
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
