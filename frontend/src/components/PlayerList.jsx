function PlayerList({ players = [], currentPlayerId }) {
  return (
    <div className="space-y-3">
      {players.length === 0 ? (
        <div className="rounded-[1.6rem] border border-dashed border-white/10 px-4 py-6 text-center text-sm leading-7 text-slate-400">
          Waiting for players to join the room.
        </div>
      ) : null}

      {players.map((player, index) => (
        <article
          key={player.id}
          className="glass-outline rounded-[1.6rem] px-4 py-4 transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-bubblegum/70 via-flare/70 to-aurora/70 text-xl shadow-[0_0_26px_rgba(249,115,22,0.18)]">
                {player.avatar || '🙂'}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="break-words text-sm font-semibold leading-5 text-white sm:text-base">
                    {index + 1}. {player.name}
                  </p>
                  {player.isHost ? (
                    <span className="status-pill border-aurora/30 bg-aurora/15 text-aurora">
                      Host
                    </span>
                  ) : null}
                  {player.id === currentPlayerId ? (
                    <span className="status-pill border-bubblegum/30 bg-bubblegum/10 text-bubblegum">
                      You
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-400">
                  Ready in the room
                </p>
                <p className="mt-2 text-sm text-slate-300">{player.score || 0} pts</p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="font-display text-2xl font-bold text-white">{index + 1}</p>
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                seat
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PlayerList;
