function PlayerList({ players = [], currentPlayerId }) {
  return (
    <div className="space-y-3">
      {players.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-400">
          Waiting for players to join the room.
        </div>
      ) : null}

      {players.map((player, index) => (
        <div
          key={player.id}
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              {player.avatar || '🙂'}
            </div>
            <div>
              <p className="font-medium text-white">
                {index + 1}. {player.name}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {player.id === currentPlayerId ? 'You' : 'Player'}
              </p>
              <p className="text-xs text-slate-500">{player.score || 0} pts</p>
            </div>
          </div>
          {player.isHost ? (
            <span className="rounded-full border border-aurora/30 bg-aurora/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-aurora">
              Host
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default PlayerList;
