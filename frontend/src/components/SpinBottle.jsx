function SpinBottle({ rotation = 0, duration = 700, isSpinning = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-slate-950/75 shadow-[0_0_80px_rgba(236,72,153,0.16)] backdrop-blur">
        <div className={isSpinning ? 'absolute inset-0 animate-ping rounded-full bg-flare/10' : 'hidden'} />
        <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />
        <div
          className={[
            'relative h-28 w-28 transition-transform',
            isSpinning ? 'drop-shadow-[0_0_26px_rgba(249,115,22,0.55)]' : '',
          ].join(' ')}
          style={{
            transform: `rotate(${rotation}deg)`,
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: isSpinning
              ? 'cubic-bezier(0.12, 0.8, 0.18, 1)'
              : 'ease-out',
          }}
        >
          <div className="absolute left-1/2 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.65)]" />
          <div className="absolute left-1/2 top-3 h-0 w-0 -translate-x-1/2 border-x-[12px] border-b-[20px] border-x-transparent border-b-flare" />
          <div className="absolute left-1/2 top-7 h-16 w-6 -translate-x-1/2 rounded-full bg-gradient-to-b from-aurora via-neon to-bubblegum" />
          <div className="absolute left-1/2 top-[5.75rem] h-7 w-4 -translate-x-1/2 rounded-b-full bg-gradient-to-b from-white/90 to-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default SpinBottle;
