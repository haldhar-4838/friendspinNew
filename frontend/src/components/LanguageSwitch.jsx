import { useLanguage } from '../context/LanguageContext';

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="glass-outline inline-flex items-center gap-1 rounded-full p-1">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-label="Switch language to English"
        className={[
          'touch-button min-h-[2rem] rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition',
          language === 'en'
            ? 'bg-white/[0.12] text-white shadow-[0_10px_20px_-14px_rgba(236,72,153,0.9)]'
            : 'text-slate-400 hover:text-white',
        ].join(' ')}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        aria-label="Switch language to Hindi"
        className={[
          'touch-button min-h-[2rem] rounded-full px-2.5 text-[11px] font-semibold tracking-[0.08em] transition',
          language === 'hi'
            ? 'bg-white/[0.12] text-white shadow-[0_10px_20px_-14px_rgba(236,72,153,0.9)]'
            : 'text-slate-400 hover:text-white',
        ].join(' ')}
      >
        हिं
      </button>
    </div>
  );
}

export default LanguageSwitch;
