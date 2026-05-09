function PlayerCircle({
  players = [],
  selectedPlayerId,
  currentPlayerId,
  layout = 'circle',
}) {
  const renderPlayerCard = (player, index, compact = false) => {
    const isSelected = player.id === selectedPlayerId;
    const isCurrentPlayer = player.id === currentPlayerId;
    const fallbackAvatar = player.name.slice(0, 1).toUpperCase();

    return (
      <div
        className={[
          'glass-outline text-center transition duration-300',
          compact
            ? 'flex min-h-[3.7rem] min-w-0 items-center gap-3 rounded-[1.45rem] px-3 py-2.5 text-left'
            : 'rounded-[1.6rem] px-2.5 py-3 shadow-glass',
          isSelected
            ? 'selected-player-glow border-bubblegum/60 bg-bubblegum/[0.12]'
            : isCurrentPlayer
              ? 'border-neon/30 bg-neon/[0.08]'
              : 'bg-slate-900/70',
        ].join(' ')}
      >
        <div
          className={[
            'shrink-0 rounded-[1rem] bg-gradient-to-br from-bubblegum/85 via-neon/85 to-aurora/85 text-white shadow-[0_0_24px_rgba(236,72,153,0.24)]',
            compact
              ? 'flex h-10 w-10 items-center justify-center text-sm font-semibold'
              : 'mx-auto flex h-11 w-11 items-center justify-center text-sm font-semibold',
          ].join(' ')}
        >
          {player.avatar || fallbackAvatar}
        </div>

        <div className={compact ? 'min-w-0 flex-1' : 'mt-2'}>
          <p
            className={[
              'font-semibold text-white',
              compact
                ? 'truncate text-sm'
                : 'break-words text-[11px] leading-4 sm:text-xs',
            ].join(' ')}
          >
            {compact ? player.name : `${index + 1}. ${player.name}`}
          </p>

          <div
            className={[
              'mt-1 flex flex-wrap items-center gap-1 text-slate-400',
              compact
                ? 'text-[9px] uppercase tracking-[0.18em]'
                : 'justify-center text-[8px] uppercase tracking-[0.18em]',
            ].join(' ')}
          >
            {player.isHost ? <span>Host</span> : null}
            {isCurrentPlayer ? <span>You</span> : null}
          </div>

          <p
            className={[
              'mt-1 text-slate-300',
              compact ? 'text-xs' : 'text-[10px]',
            ].join(' ')}
          >
            {player.score || 0} pts
          </p>
        </div>
      </div>
    );
  };

  if (layout === 'chips') {
    return (
      <div className="flex flex-wrap justify-center gap-2.5">
        {players.map((player, index) => (
          <div key={player.id} className="w-full sm:w-auto sm:max-w-[14rem]">
            {renderPlayerCard(player, index, true)}
          </div>
        ))}
      </div>
    );
  }

  const playerCount = Math.max(players.length, 1);
  const radius = playerCount <= 4 ? 40 : playerCount <= 6 ? 42 : 44;
  const itemWidthClass =
    playerCount <= 4
      ? 'w-[5.5rem]'
      : playerCount <= 6
        ? 'w-[5rem]'
        : 'w-[4.7rem]';

  return (
    <div className="relative mx-auto hidden h-[30rem] w-full max-w-[34rem] lg:block xl:h-[32rem] xl:max-w-[36rem]">
      <div className="absolute inset-[11%] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_72%)] shadow-[0_0_60px_rgba(139,92,246,0.18)]" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-[31%] rounded-full border border-white/10 bg-slate-950/55 shadow-[0_30px_80px_-38px_rgba(2,6,23,1)]" />
      <div className="absolute inset-[36%] rounded-full border border-white/6 bg-[radial-gradient(circle,rgba(255,255,255,0.06),rgba(7,13,33,0.9)_75%)]" />

      {players.map((player, index) => {
        const angle = (Math.PI * 2 * index) / players.length;
        const x = 50 + Math.sin(angle) * radius;
        const y = 50 - Math.cos(angle) * radius;

        return (
          <div
            key={player.id}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${itemWidthClass}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {renderPlayerCard(player, index)}
          </div>
        );
      })}
    </div>
  );
}

export default PlayerCircle;
