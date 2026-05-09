import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function RoomCodeBox({ roomCode }) {
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.22),rgba(236,72,153,0.18),rgba(34,211,238,0.12))] px-4 py-4 shadow-[0_28px_68px_-32px_rgba(139,92,246,0.78)]">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="flex flex-col gap-4">
        <div className="min-w-0">
          <div className="status-pill border-white/15 bg-white/10 text-slate-100">
            {t('roomCodeBox.badge')}
          </div>
          <p className="mt-3 section-kicker">{t('roomCodeBox.label')}</p>
          <p className="mt-2 break-all font-display text-[1.75rem] font-bold tracking-[0.22em] text-white">
            {roomCode}
          </p>
          <p className="mt-2 text-sm text-slate-300">
            {t('roomCodeBox.subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="touch-button inline-flex min-h-[3.2rem] w-full items-center justify-center rounded-[1.2rem] border border-white/15 bg-white/[0.1] px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl hover:bg-white/[0.14]"
        >
          {isCopied ? t('common.copied') : t('common.copyCode')}
        </button>
      </div>
    </div>
  );
}

export default RoomCodeBox;
