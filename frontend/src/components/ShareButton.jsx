import { useEffect, useState } from 'react';
import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

function ShareButton({ roomCode }) {
  const shareUrl = `${window.location.origin}/join?roomCode=${roomCode}`;
  const { t } = useLanguage();
  const defaultLabel = t('common.copyInvite');
  const [label, setLabel] = useState(defaultLabel);

  useEffect(() => {
    setLabel(defaultLabel);
  }, [defaultLabel]);

  const resetLabel = (nextLabel) => {
    setLabel(nextLabel);
    window.setTimeout(() => setLabel(defaultLabel), 1800);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('share.title'),
          text: t('share.text', { roomCode }),
          url: shareUrl,
        });
        resetLabel(t('common.shared'));
        return;
      } catch {
        // Ignore canceled native share requests and fall through to clipboard.
      }
    }

    await navigator.clipboard.writeText(shareUrl);
    resetLabel(t('common.copied'));
  };

  return (
    <Button
      variant="secondary"
      onClick={handleShare}
      className="min-h-[3.8rem] w-full justify-center gap-3"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 8L9 12L15 16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      {label}
    </Button>
  );
}

export default ShareButton;
