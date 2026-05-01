import { Link, NavLink } from 'react-router-dom';

const linkStyles = ({ isActive }) =>
  [
    'flex min-h-[2.85rem] items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200',
    isActive
      ? 'border border-white/15 bg-white/[0.12] text-white shadow-[0_12px_30px_-20px_rgba(236,72,153,0.65)]'
      : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.08] hover:text-white',
  ].join(' ');

function Navbar() {
  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/70 px-3 py-3 shadow-glass backdrop-blur-2xl sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-bubblegum via-flare to-aurora text-lg font-bold text-white shadow-party">
            FS
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-base font-semibold tracking-[0.04em] text-white sm:text-lg">
                FriendSpin
              </p>
              <p className="truncate text-[10px] uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
                Premium Party Room
              </p>
            </div>
          </Link>

          <nav className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:auto-cols-max sm:grid-flow-col">
            <NavLink to="/create-room" className={linkStyles}>
              Create Room
            </NavLink>
            <NavLink to="/join-room" className={linkStyles}>
              Join Room
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
