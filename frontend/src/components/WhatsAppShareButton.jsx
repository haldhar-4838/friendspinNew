import Button from './Button';

function WhatsAppShareButton({ roomCode }) {
  const inviteLink = `${window.location.origin}/join-room?roomCode=${roomCode}`;
  const message = `Aaja FriendSpin khelte hain 😂🔥\nRoom Code: ${roomCode}\nJoin Link: ${inviteLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <Button
      variant="secondary"
      onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
      className="min-h-[3.6rem] w-full justify-center"
    >
      WhatsApp Share
    </Button>
  );
}

export default WhatsAppShareButton;
