function SpinBottle({ rotation = 0, duration = 700, isSpinning = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        className={[
          'relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 shadow-[0_0_80px_rgba(236,72,153,0.16)] backdrop-blur sm:h-40 sm:w-40 lg:h-44 lg:w-44',
          isSpinning ? 'animate-pulse-soft' : '',
        ].join(' ')}
      >
        <div
          className={
            isSpinning ? 'absolute inset-0 animate-ping rounded-full bg-flare/10' : 'hidden'
          }
        />
        <div className="absolute inset-3 rounded-full border border-dashed border-white/10 sm:inset-4" />
        <div
          className={[
            'relative h-20 w-20 transition-transform sm:h-24 sm:w-24 lg:h-28 lg:w-28',
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
          <div className="absolute left-1/2 top-2 h-0 w-0 -translate-x-1/2 border-x-[10px] border-b-[18px] border-x-transparent border-b-flare sm:top-3 sm:border-x-[12px] sm:border-b-[20px]" />
          <div className="absolute left-1/2 top-6 h-12 w-5 -translate-x-1/2 rounded-full bg-gradient-to-b from-aurora via-neon to-bubblegum sm:top-7 sm:h-14 sm:w-6 lg:h-16" />
          <div className="absolute left-1/2 top-[4.4rem] h-6 w-3.5 -translate-x-1/2 rounded-b-full bg-gradient-to-b from-white/90 to-slate-200 sm:top-[5rem] sm:h-7 sm:w-4 lg:top-[5.75rem]" />
        </div>
      </div>
    </div>
  );
}

export default SpinBottle;
