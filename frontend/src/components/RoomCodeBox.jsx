function RoomCodeBox({ roomCode }) {
  return (
    <div className="rounded-3xl border border-bubblegum/20 bg-gradient-to-r from-bubblegum/10 via-white/5 to-aurora/10 p-5">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
        Room Code
      </p>
      <p className="mt-3 font-display text-4xl font-bold tracking-[0.3em] text-white sm:text-5xl">
        {roomCode}
      </p>
    </div>
  );
}

export default RoomCodeBox;
