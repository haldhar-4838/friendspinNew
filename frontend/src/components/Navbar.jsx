import { Link, NavLink, useLocation } from 'react-router-dom';

const linkStyles = ({ isActive }) =>
  [
    'flex min-h-[2.5rem] items-center justify-center rounded-full px-3.5 py-2 text-sm font-semibold transition duration-200',
    isActive
      ? 'border border-white/15 bg-white/[0.12] text-white shadow-[0_16px_30px_-22px_rgba(139,92,246,0.75)]'
      : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.08] hover:text-white',
  ].join(' ');

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-30 px-4 pt-2 sm:px-6 sm:pt-3 lg:px-8">
      <div
        className={[
          'mx-auto flex max-w-5xl items-center justify-between gap-3 backdrop-blur-xl',
          isHome
            ? 'app-header-home min-h-[3.4rem] rounded-[1.2rem] px-1.5 py-1.5 sm:min-h-[3.6rem] sm:px-2.5'
            : 'app-header-shell min-h-[3.75rem] rounded-[1.5rem] px-2 py-2.5 sm:px-3',
        ].join(' ')}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-neon via-bubblegum to-aurora text-sm font-bold text-white shadow-[0_16px_32px_-16px_rgba(139,92,246,0.88)] sm:h-11 sm:w-11">
            FS
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.95rem] font-semibold tracking-[-0.03em] text-white sm:text-lg">
              FriendSpin
            </p>
          </div>
        </Link>

        {isHome ? (
          <>
            <Link
              to="/join-room"
              className="app-header-link inline-flex min-h-[2.35rem] items-center justify-center rounded-full px-3.5 text-sm font-semibold text-slate-200"
            >
              Join
            </Link>
          </>
        ) : (
          <nav className="flex items-center gap-2">
            <NavLink to="/create-room" className={linkStyles}>
              Create
            </NavLink>
            <NavLink to="/join-room" className={linkStyles}>
              Join
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
