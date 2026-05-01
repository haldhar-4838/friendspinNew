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
          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl">
              {player.avatar}
            </div>
            <div>
              <p className="font-medium text-white">
                {index + 1}. {player.name}
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                {player.isHost ? 'Host' : 'Player'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-bold text-white">
              {player.score || 0}
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              points
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
