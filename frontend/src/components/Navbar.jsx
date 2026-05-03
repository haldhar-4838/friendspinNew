import { Link, NavLink } from 'react-router-dom';

const linkStyles = ({ isActive }) =>
  [
    'flex min-h-[2.9rem] items-center justify-center rounded-[1.2rem] px-3.5 py-2 text-sm font-semibold transition duration-200',
    isActive
      ? 'border border-white/15 bg-white/[0.12] text-white shadow-[0_18px_34px_-22px_rgba(236,72,153,0.7)]'
      : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.08] hover:text-white',
  ].join(' ');

function Navbar() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-white/10 bg-slate-950/55 px-3 py-3 shadow-glass backdrop-blur-2xl sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-bubblegum via-neon to-aurora text-base font-bold text-white shadow-[0_18px_36px_-18px_rgba(139,92,246,0.9)]">
              FS
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-base font-semibold tracking-[-0.03em] text-white sm:text-lg">
                FriendSpin
              </p>
              <p className="truncate text-xs text-slate-400">
                Truth or Dare with friends
              </p>
            </div>
          </Link>

          <nav className="grid shrink-0 grid-cols-2 gap-2">
            <NavLink to="/create-room" className={linkStyles}>
              Create
            </NavLink>
            <NavLink to="/join-room" className={linkStyles}>
              Join
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
