import { useState } from 'react';

function RoomCodeBox({ roomCode }) {
  const [isCopied, setIsCopied] = useState(false);

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
    <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(135deg,rgba(236,72,153,0.14),rgba(139,92,246,0.08),rgba(16,185,129,0.14))] px-5 py-5 shadow-[0_24px_55px_-35px_rgba(236,72,153,0.7)]">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_72%)]" />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="section-kicker">Room Code</p>
          <p className="mt-2 break-all font-display text-[2rem] font-bold tracking-[0.22em] text-white sm:text-[2.5rem]">
            {roomCode}
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Share this code or the invite link to bring friends in fast.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="touch-button inline-flex min-h-[3.1rem] shrink-0 items-center justify-center rounded-[1.25rem] border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.12]"
        >
          {isCopied ? 'Copied' : 'Copy Code'}
        </button>
      </div>
    </div>
  );
}

export default RoomCodeBox;
