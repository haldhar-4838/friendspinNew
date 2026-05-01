function RoomCodeBox({ roomCode }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-bubblegum/20 bg-gradient-to-r from-bubblegum/15 via-white/[0.07] to-aurora/15 px-5 py-6 text-center shadow-glow-pink">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_72%)]" />
      <p className="text-xs uppercase tracking-[0.35em] text-slate-300">
        Room Code
      </p>
      <p className="mt-3 break-all font-display text-[2.25rem] font-bold tracking-[0.24em] text-white sm:text-5xl">
        {roomCode}
      </p>
      <p className="mt-3 text-sm text-slate-300">
        Share this code or invite link so your friends can join instantly.
      </p>
    </div>
  );
}

export default RoomCodeBox;
