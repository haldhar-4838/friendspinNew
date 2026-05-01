function Leaderboard({ players = [] }) {
  const sortedPlayers = [...players].sort((firstPlayer, secondPlayer) => {
    if ((secondPlayer.score || 0) !== (firstPlayer.score || 0)) {
      return (secondPlayer.score || 0) - (firstPlayer.score || 0);
    }

    return firstPlayer.name.localeCompare(secondPlayer.name);
  });

  return (
    <div className="space-y-3">
      {sortedPlayers.map((player, index) => (
        <div
          key={player.id}
          className="glass-outline flex items-start justify-between gap-3 rounded-[1.6rem] px-4 py-4"
        >
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.1rem] bg-gradient-to-br from-bubblegum/70 via-flare/70 to-aurora/70 text-xl">
              {player.avatar || player.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="break-words font-medium leading-5 text-white">
                {index + 1}. {player.name}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-slate-400">
                {player.isHost ? 'Host' : 'Player'}
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-2xl font-bold text-white">
              {player.score || 0}
            </p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
              points
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
