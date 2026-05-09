import { Link, NavLink } from 'react-router-dom';
import LanguageSwitch from './LanguageSwitch';
import { useLanguage } from '../context/LanguageContext';

const linkStyles = ({ isActive }) =>
  [
    'flex min-h-[2.25rem] items-center justify-center rounded-full px-2.5 py-1.5 text-[0.95rem] font-medium transition duration-200',
    isActive
      ? 'text-white'
      : 'text-slate-300 hover:text-white',
  ].join(' ');

function Navbar() {
  const { openLanguageGate, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 px-4 pt-3">
      <div className="mx-auto flex max-w-[27.5rem] items-center justify-between gap-3">
        <Link
          to="/"
          onClick={openLanguageGate}
          className="truthdare-brand flex min-w-0 items-center gap-3"
        >
          <span className="truthdare-brand-heart">
            <svg
              viewBox="0 0 40 40"
              className="h-[1rem] w-[1rem] text-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 31.5 9.5 21.6a6.8 6.8 0 0 1-.3-9.6 6.8 6.8 0 0 1 9.6-.1l1.2 1.2 1.2-1.2a6.8 6.8 0 0 1 9.6.1 6.8 6.8 0 0 1-.3 9.6L20 31.5Z"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-[1rem] font-bold tracking-[-0.05em] text-white sm:text-[1.05rem]">
              <span className="text-white">Truth</span>
              <span className="bg-gradient-to-r from-[#ff5d8f] to-[#ff3d81] bg-clip-text text-transparent">
                Dare
              </span>
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <LanguageSwitch />
          <nav className="flex items-center gap-1.5">
            <NavLink to="/create-room" className={linkStyles}>
              {t('common.create')}
            </NavLink>
            <NavLink to="/join-room" className={linkStyles}>
              {t('common.join')}
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
