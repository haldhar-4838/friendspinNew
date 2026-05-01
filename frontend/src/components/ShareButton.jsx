import Button from './Button';

function ShareButton({ roomCode }) {
  const shareUrl = `${window.location.origin}/join-room?roomCode=${roomCode}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my FriendSpin room',
          text: `Use room code ${roomCode} to join the party.`,
          url: shareUrl,
        });
        return;
      } catch {
        // Ignore canceled native share requests and fall through to clipboard.
      }
    }

    await navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Button variant="secondary" onClick={handleShare} className="w-full">
      Share Invite Link
    </Button>
  );
}

export default ShareButton;
