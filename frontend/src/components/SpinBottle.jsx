function SpinBottle({ rotation = 0, duration = 700, isSpinning = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="absolute top-[12%] h-10 w-10 rotate-45 rounded-[0.9rem] border border-white/10 bg-white/[0.1] shadow-[0_12px_30px_-18px_rgba(255,255,255,0.45)]" />
      <div
        className={[
          'bottle-stage-shell relative h-[8.25rem] w-[8.25rem] sm:h-[9.25rem] sm:w-[9.25rem] lg:h-[12rem] lg:w-[12rem] xl:h-[13.25rem] xl:w-[13.25rem]',
          isSpinning ? 'animate-pulse-soft' : '',
        ].join(' ')}
      >
        <div
          className={
            isSpinning
              ? 'absolute inset-0 rounded-full bg-bubblegum/10 blur-xl'
              : 'hidden'
          }
        />
        <div className="absolute inset-[8%] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.08),rgba(7,13,33,0.96)_72%)]" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.55)] lg:h-5 lg:w-5" />

        <div
          className={[
            'absolute left-1/2 top-1/2 h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform sm:h-[5.35rem] sm:w-[5.35rem] lg:h-[7rem] lg:w-[7rem] xl:h-[7.6rem] xl:w-[7.6rem]',
            isSpinning ? 'drop-shadow-[0_0_28px_rgba(139,92,246,0.5)]' : '',
          ].join(' ')}
          style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: isSpinning
              ? 'cubic-bezier(0.12, 0.8, 0.18, 1)'
              : 'ease-out',
          }}
        >
          <div className="absolute left-1/2 top-[6%] h-[18%] w-[22%] -translate-x-1/2 rounded-t-full bg-gradient-to-b from-white via-white/95 to-slate-200 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
          <div className="absolute left-1/2 top-[18%] h-[58%] w-[28%] -translate-x-1/2 rounded-full bg-gradient-to-b from-aurora via-neon to-bubblegum shadow-[0_16px_30px_-18px_rgba(139,92,246,0.7)]" />
          <div className="absolute left-1/2 top-[65%] h-[26%] w-[15%] -translate-x-1/2 rounded-b-full bg-gradient-to-b from-white to-slate-200" />
          <div className="absolute left-1/2 top-[10%] h-0 w-0 -translate-x-1/2 border-x-[10px] border-b-[18px] border-x-transparent border-b-flare sm:border-x-[12px] sm:border-b-[20px] lg:border-x-[14px] lg:border-b-[24px]" />
        </div>
      </div>
    </div>
  );
}

export default SpinBottle;
