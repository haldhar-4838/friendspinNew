import { useLanguage } from '../context/LanguageContext';

function LanguageCard({ icon, title, subtitle, variant, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'language-option-card touch-button',
        variant === 'secondary'
          ? 'language-option-card-secondary'
          : 'language-option-card-primary',
      ].join(' ')}
    >
      <span
        className={[
          'language-option-icon',
          variant === 'secondary'
            ? 'bg-[linear-gradient(180deg,rgba(105,26,52,0.96),rgba(79,15,38,0.9))]'
            : 'bg-[linear-gradient(180deg,rgba(88,41,154,0.96),rgba(58,24,115,0.9))]',
        ].join(' ')}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[1.05rem] font-semibold text-white">
          {title}
        </span>
        <span className="mt-1 block text-[0.92rem] text-slate-300">
          {subtitle}
        </span>
      </span>

      <span className="language-option-chevron" aria-hidden="true">
        ›
      </span>
    </button>
  );
}

function LanguageGate() {
  const { setLanguage } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 px-3 py-4 sm:px-4">
      <div className="absolute inset-0 bg-[rgba(3,2,10,0.9)] backdrop-blur-xl" />
      <div className="language-gate-glow language-gate-glow-1" />
      <div className="language-gate-glow language-gate-glow-2" />
      <div className="language-gate-glow language-gate-glow-3" />

      <div className="relative mx-auto flex min-h-full w-full max-w-[27.5rem] items-center justify-center">
        <div className="language-gate-screen relative w-full overflow-hidden rounded-[2rem] px-6 py-8 sm:px-7">
          <div className="mx-auto flex max-w-[19rem] flex-col items-center text-center">
            <span className="truthdare-brand-heart h-[4.15rem] w-[4.15rem] rounded-[1.6rem]">
              <svg
                viewBox="0 0 40 40"
                className="h-[1.5rem] w-[1.5rem] text-white"
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

            <h1 className="mt-6 font-display text-[3rem] font-bold tracking-[-0.07em] text-white">
              <span>Truth</span>
              <span className="bg-gradient-to-r from-[#ff699a] to-[#ff4185] bg-clip-text text-transparent">
                Dare
              </span>
            </h1>
            <p className="mt-2 text-[1.1rem] leading-7 text-slate-300">
              Truth or Dare? Let the fun begin!
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-[20rem] text-center">
            <h2 className="font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-white">
              Choose your language
            </h2>
            <p className="mt-3 text-[1rem] leading-7 text-slate-300">
              Select the language you want
              <br />
              to play in
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-[21rem] gap-4">
            <LanguageCard
              icon="A"
              title="English"
              subtitle="Play in English"
              onClick={() => setLanguage('en')}
            />

            <LanguageCard
              icon="अ"
              title="हिंदी"
              subtitle="हिंदी में खेलें"
              variant="secondary"
              onClick={() => setLanguage('hi')}
            />
          </div>

          <div className="mx-auto mt-10 flex max-w-[21rem] items-center gap-2 text-left text-[0.92rem] text-slate-400">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[0.82rem]">
              ○
            </span>
            <p>You can change language anytime in settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageGate;
