function PlayerCircle({ players = [], selectedPlayerId, currentPlayerId }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      <div className="absolute inset-[10%] rounded-full border border-white/10 bg-white/[0.03]" />
      <div className="absolute inset-[20%] rounded-full border border-dashed border-white/10" />

      {players.map((player, index) => {
        const angle = (Math.PI * 2 * index) / players.length;
        const radius = 39;
        const x = 50 + Math.sin(angle) * radius;
        const y = 50 - Math.cos(angle) * radius;
        const isSelected = player.id === selectedPlayerId;
        const isCurrentPlayer = player.id === currentPlayerId;

        return (
          <div
            key={player.id}
            className="absolute w-28 -translate-x-1/2 -translate-y-1/2 sm:w-32"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div
              className={[
                'rounded-3xl border px-3 py-3 text-center shadow-lg backdrop-blur transition duration-300',
                isSelected
                  ? 'scale-110 border-flare/70 bg-flare/25 shadow-[0_0_45px_rgba(249,115,22,0.55)]'
                  : 'border-white/10 bg-slate-900/75',
              ].join(' ')}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-bubblegum/80 via-flare/80 to-aurora/80 text-2xl shadow-[0_0_24px_rgba(236,72,153,0.22)]">
                {player.avatar || player.name.slice(0, 1).toUpperCase()}
              </div>
              <p className="mt-3 truncate text-sm font-semibold text-white">
                {player.name}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-slate-400">
                {player.isHost ? <span>Host</span> : null}
                {isCurrentPlayer ? <span>You</span> : null}
              </div>
              <p className="mt-2 text-xs text-slate-400">{player.score || 0} pts</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlayerCircle;
