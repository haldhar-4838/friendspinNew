function SpinBottle({ rotation = 0, duration = 700, isSpinning = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="absolute top-[12%] h-11 w-11 rotate-45 rounded-[1rem] border border-white/10 bg-white/[0.08] shadow-[0_18px_34px_-20px_rgba(255,255,255,0.32)]" />
      <div
        className={[
          'bottle-stage-shell truthdare-bottle-shell relative h-[11rem] w-[11rem] sm:h-[12rem] sm:w-[12rem]',
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
        <div className="absolute inset-[8%] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.06),rgba(8,8,18,0.96)_72%)]" />
        <div className="absolute inset-[18%] rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/95 shadow-[0_0_20px_rgba(255,255,255,0.45)]" />

        <div
          className={[
            'absolute left-1/2 top-1/2 h-[5.75rem] w-[5.75rem] -translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform sm:h-[6.25rem] sm:w-[6.25rem]',
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
          <div className="absolute left-1/2 top-[7%] h-[14%] w-[26%] -translate-x-1/2 rounded-t-full bg-gradient-to-b from-white to-white/80 shadow-[0_0_12px_rgba(255,255,255,0.28)]" />
          <div className="absolute left-1/2 top-[18%] h-[62%] w-[34%] -translate-x-1/2 rounded-[1.2rem] bg-gradient-to-b from-[#ff4d81] via-[#d057ff] to-[#8c63ff] shadow-[0_16px_36px_-16px_rgba(212,69,125,0.78)]" />
          <div className="absolute left-1/2 top-[30%] h-[8%] w-[7%] -translate-x-1/2 rounded-full bg-white/90" />
          <div className="absolute left-1/2 bottom-[14%] h-[8%] w-[18%] -translate-x-1/2 rounded-full bg-white/95" />
          <div className="absolute left-1/2 top-[14%] h-0 w-0 -translate-x-1/2 border-x-[10px] border-b-[18px] border-x-transparent border-b-white/90 sm:border-x-[11px] sm:border-b-[20px]" />
        </div>
      </div>
    </div>
  );
}

export default SpinBottle;
