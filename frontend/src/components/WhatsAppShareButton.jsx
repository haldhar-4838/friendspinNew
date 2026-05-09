import Button from './Button';

function WhatsAppShareButton({ roomCode }) {
  const inviteLink = `${window.location.origin}/join?roomCode=${roomCode}`;
  const message = `Join my FriendSpin room.\nRoom Code: ${roomCode}\nJoin Link: ${inviteLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <Button
      variant="whatsapp"
      onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
      className="min-h-[3.8rem] w-full justify-center gap-3"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0012.08 0C5.5 0 .16 5.34.16 11.92c0 2.1.55 4.16 1.58 5.98L0 24l6.29-1.65a11.93 11.93 0 005.79 1.48h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.17-3.49-8.43ZM12.09 21.8h-.01a9.88 9.88 0 01-5.03-1.38l-.36-.22-3.73.98 1-3.64-.24-.37a9.87 9.87 0 01-1.52-5.25c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 7c0 5.45-4.44 9.89-9.89 9.89Zm5.43-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48 0 1.47 1.08 2.88 1.23 3.08.15.2 2.12 3.24 5.15 4.54.72.31 1.29.5 1.73.63.73.23 1.39.2 1.91.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.08-.12-.28-.2-.58-.35Z" />
      </svg>
      Share on WhatsApp
    </Button>
  );
}

export default WhatsAppShareButton;
