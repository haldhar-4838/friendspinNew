import { Link, NavLink, useLocation } from 'react-router-dom';

const linkStyles = ({ isActive }) =>
  [
    'flex min-h-[2.35rem] items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition duration-200',
    isActive
      ? 'border border-white/15 bg-white/[0.1] text-white shadow-[0_16px_30px_-22px_rgba(139,92,246,0.75)]'
      : 'border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white',
  ].join(' ');

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-30 px-4 pt-3">
      <div className="mx-auto flex max-w-[27.5rem] items-center justify-between gap-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/10 bg-white/[0.06] shadow-[0_18px_34px_-24px_rgba(139,92,246,0.8)] backdrop-blur-xl">
            <svg
              viewBox="0 0 40 40"
              className="h-[1.1rem] w-[1.1rem] text-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 23.5C8 15.492 14.492 9 22.5 9c3.3 0 6.344 1.102 8.784 2.958"
                stroke="url(#logoGradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M32 16.5C32 24.508 25.508 31 17.5 31c-3.3 0-6.344-1.102-8.784-2.958"
                stroke="url(#logoGradientAlt)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="27.5" cy="11.5" r="3.5" fill="#EC4899" />
              <circle cx="12.5" cy="28.5" r="3.5" fill="#22D3EE" />
              <defs>
                <linearGradient id="logoGradient" x1="8" y1="9" x2="31.284" y2="25.403" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8B5CF6" />
                  <stop offset="0.5" stopColor="#EC4899" />
                  <stop offset="1" stopColor="#22D3EE" />
                </linearGradient>
                <linearGradient id="logoGradientAlt" x1="10" y1="16.5" x2="32" y2="31" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22D3EE" />
                  <stop offset="0.55" stopColor="#8B5CF6" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[0.98rem] font-semibold tracking-[-0.04em] text-white">
              FriendSpin
            </p>
          </div>
        </Link>

        {isHome ? (
          <Link
            to="/join-room"
            className="app-header-link inline-flex min-h-[2.35rem] items-center justify-center rounded-full px-3.5 text-xs font-semibold text-slate-200 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white"
          >
            Join
          </Link>
        ) : (
          <nav className="flex items-center gap-1.5">
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
