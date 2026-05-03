import { useState } from 'react';
import Button from './Button';

function ShareButton({ roomCode }) {
  const shareUrl = `${window.location.origin}/join-room?roomCode=${roomCode}`;
  const [label, setLabel] = useState('Copy Invite');

  const resetLabel = (nextLabel) => {
    setLabel(nextLabel);
    window.setTimeout(() => setLabel('Copy Invite'), 1800);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my FriendSpin room',
          text: `Use room code ${roomCode} to join the party.`,
          url: shareUrl,
        });
        resetLabel('Shared');
        return;
      } catch {
        // Ignore canceled native share requests and fall through to clipboard.
      }
    }

    await navigator.clipboard.writeText(shareUrl);
    resetLabel('Copied');
  };

  return (
    <Button
      variant="secondary"
      onClick={handleShare}
      className="min-h-[3.6rem] w-full justify-center"
    >
      {label}
    </Button>
  );
}

export default ShareButton;
