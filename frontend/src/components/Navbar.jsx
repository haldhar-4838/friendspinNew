import { Link, NavLink } from 'react-router-dom';

const linkStyles = ({ isActive }) =>
  [
    'flex min-h-[2.65rem] items-center justify-center rounded-[1.15rem] px-3.5 py-2 text-sm font-semibold transition duration-200 sm:min-h-[2.85rem] sm:rounded-2xl sm:px-4 sm:py-2.5',
    isActive
      ? 'border border-white/15 bg-white/[0.12] text-white shadow-[0_12px_30px_-20px_rgba(236,72,153,0.65)]'
      : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.08] hover:text-white',
  ].join(' ');

function Navbar() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-white/10 bg-slate-950/70 px-3 py-2.5 shadow-glass backdrop-blur-2xl sm:rounded-[2rem] sm:px-5 sm:py-3">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-bubblegum via-flare to-aurora text-base font-bold text-white shadow-party sm:h-11 sm:w-11 sm:rounded-2xl sm:text-lg">
              FS
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-[0.95rem] font-semibold tracking-[0.04em] text-white sm:text-lg">
                FriendSpin
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
