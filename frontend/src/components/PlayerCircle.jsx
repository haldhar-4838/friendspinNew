function PlayerCircle({ players = [], selectedPlayerId, currentPlayerId }) {
  const playerCount = Math.max(players.length, 1);
  const radius = playerCount <= 4 ? 29 : playerCount <= 6 ? 32 : 34;
  const itemWidthClass =
    playerCount <= 4
      ? 'w-[5.85rem] sm:w-28 lg:w-32'
      : playerCount <= 6
        ? 'w-[5.35rem] sm:w-24 lg:w-28'
        : 'w-[5rem] sm:w-24';

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[34rem]">
      <div className="absolute inset-[14%] rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_60px_rgba(236,72,153,0.08)]" />
      <div className="absolute inset-[25%] rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-[34%] rounded-full border border-white/10 bg-gradient-to-br from-bubblegum/10 via-transparent to-aurora/10" />

      {players.map((player, index) => {
        const angle = (Math.PI * 2 * index) / players.length;
        const x = 50 + Math.sin(angle) * radius;
        const y = 50 - Math.cos(angle) * radius;
        const isSelected = player.id === selectedPlayerId;
        const isCurrentPlayer = player.id === currentPlayerId;

        return (
          <div
            key={player.id}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${itemWidthClass}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className={[
                'glass-outline rounded-[1.5rem] px-2.5 py-2.5 text-center shadow-glass transition duration-300',
                isSelected
                  ? 'z-20 scale-[1.08] border-flare/70 bg-flare/15 shadow-[0_0_45px_rgba(249,115,22,0.45)]'
                  : isCurrentPlayer
                    ? 'border-bubblegum/30 bg-bubblegum/5'
                    : 'bg-slate-900/70',
              ].join(' ')}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-bubblegum/85 via-flare/85 to-aurora/80 text-xl shadow-[0_0_24px_rgba(236,72,153,0.22)] sm:h-14 sm:w-14 sm:text-2xl">
                {player.avatar || player.name.slice(0, 1).toUpperCase()}
              </div>
              <p className="mt-2 break-words text-[11px] font-semibold leading-4 text-white sm:mt-3 sm:text-sm">
                {player.name}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-1 text-[9px] uppercase tracking-[0.2em] text-slate-400 sm:gap-2 sm:text-[10px]">
                {player.isHost ? <span>Host</span> : null}
                {isCurrentPlayer ? <span>You</span> : null}
              </div>
              <p className="mt-2 text-[11px] text-slate-300 sm:text-xs">
                {player.score || 0} pts
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlayerCircle;
