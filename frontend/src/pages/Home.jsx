import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-stage relative mx-auto flex min-h-[calc(100vh-4rem)] w-full flex-1 items-center py-3 sm:py-4">
      <div className="home-glow-orb home-glow-orb-1" />
      <div className="home-glow-orb home-glow-orb-2" />
      <div className="home-glow-orb home-glow-orb-3" />

      <div className="w-full">
        <section className="home-hero-card glass-panel home-entrance p-4 sm:p-5">
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="space-y-3">
              <div className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-300">
                {t('home.badge')}
              </div>
              <h1 className="font-display text-[2.55rem] font-bold leading-[0.9] tracking-[-0.08em] text-white sm:text-[3rem]">
                {t('home.title')}
              </h1>
              <p className="max-w-[20rem] text-[0.94rem] leading-6 text-slate-300 sm:max-w-[22rem] sm:text-sm">
                {t('home.subtitle')}
              </p>
            </div>

            <div className="grid gap-3">
              <Link to="/create-room" className="w-full">
                <Button className="min-h-[3.9rem] w-full rounded-[1.35rem] text-[0.98rem] sm:min-h-[4rem] sm:text-base">
                  {t('common.createRoom')}
                </Button>
              </Link>
              <Link to="/join-room" className="w-full">
                <Button
                  variant="secondary"
                  className="min-h-[3.9rem] w-full rounded-[1.35rem] text-[0.98rem] sm:min-h-[4rem] sm:text-base"
                >
                  {t('common.joinRoom')}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="surface-muted bg-[linear-gradient(180deg,rgba(19,15,31,0.94),rgba(12,10,22,0.94))] px-3 py-2.5">
                <p className="text-xs font-semibold text-white">{t('home.featureFastRoom')}</p>
              </div>
              <div className="surface-muted bg-[linear-gradient(180deg,rgba(19,15,31,0.94),rgba(12,10,22,0.94))] px-3 py-2.5">
                <p className="text-xs font-semibold text-white">{t('home.featureLiveSync')}</p>
              </div>
              <div className="surface-muted bg-[linear-gradient(180deg,rgba(19,15,31,0.94),rgba(12,10,22,0.94))] px-3 py-2.5">
                <p className="text-xs font-semibold text-white">{t('home.featureShareCode')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
