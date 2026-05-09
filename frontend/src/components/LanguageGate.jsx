import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

function LanguageGate() {
  const { setLanguage, t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/82 backdrop-blur-xl" />
      <div className="glass-panel relative z-10 w-full max-w-sm p-5">
        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
          {t('languageGate.badge')}
        </div>
        <h2 className="mt-4 font-display text-[2rem] font-bold tracking-[-0.06em] text-white">
          {t('languageGate.title')}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {t('languageGate.subtitle')}
        </p>

        <div className="mt-6 grid gap-3">
          <Button
            fullWidth
            className="min-h-[4rem] justify-between rounded-[1.45rem] px-5"
            onClick={() => setLanguage('en')}
          >
            <span>{t('common.english')}</span>
            <span className="text-xs text-white/75">EN</span>
          </Button>
          <Button
            fullWidth
            variant="secondary"
            className="min-h-[4rem] justify-between rounded-[1.45rem] px-5"
            onClick={() => setLanguage('hi')}
          >
            <span>{t('common.hindi')}</span>
            <span className="text-xs text-white/75">हिं</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LanguageGate;
