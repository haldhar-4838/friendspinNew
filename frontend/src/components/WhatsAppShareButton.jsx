import Button from './Button';

function WhatsAppShareButton({ roomCode }) {
  const inviteLink = `${window.location.origin}/join?roomCode=${roomCode}`;
  const message = `Aaja FriendSpin khelte hain 😂🔥\nRoom Code: ${roomCode}\nJoin Link: ${inviteLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <Button
      variant="secondary"
      onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
      className="min-h-[3.6rem] w-full justify-center"
    >
      Share on WhatsApp
    </Button>
  );
}

export default WhatsAppShareButton;
