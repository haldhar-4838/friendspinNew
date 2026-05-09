import { useLanguage } from '../context/LanguageContext';

function PlayerList({
  players = [],
  currentPlayerId,
  variant = 'cards',
  showScores = true,
}) {
  const { t } = useLanguage();
  const isChipLayout = variant === 'chips';

  return (
    <div className={isChipLayout ? 'flex flex-wrap gap-2.5' : 'space-y-2.5'}>
      {players.length === 0 ? (
        <div className="w-full rounded-[1.6rem] border border-dashed border-white/10 px-4 py-6 text-center text-sm leading-7 text-slate-400">
          {t('players.waiting')}
        </div>
      ) : null}

      {players.map((player, index) => {
        const fallbackAvatar = player.name.slice(0, 1).toUpperCase();

        if (isChipLayout) {
          return (
            <article
              key={player.id}
              className="glass-outline inline-flex min-h-[3.45rem] min-w-0 items-center gap-3 rounded-[1.3rem] px-3 py-2.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-br from-bubblegum/75 via-neon/75 to-aurora/75 text-sm font-semibold text-white">
                {player.avatar || fallbackAvatar}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold text-white">
                    {player.name}
                  </p>
                  {player.isHost ? (
                    <span className="status-pill border-aurora/25 bg-aurora/10 text-aurora">
                      {t('common.host')}
                    </span>
                  ) : null}
                  {player.id === currentPlayerId ? (
                    <span className="status-pill border-bubblegum/25 bg-bubblegum/10 text-bubblegum">
                      {t('common.you')}
                    </span>
                  ) : null}
                </div>
                {showScores ? (
                  <p className="mt-1 text-xs text-slate-400">
                    {player.score || 0} {t('common.pts')}
                  </p>
                ) : null}
              </div>
            </article>
          );
        }

        return (
          <article
            key={player.id}
            className="glass-outline flex items-center justify-between gap-3 rounded-[1.45rem] px-3.5 py-3 transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-br from-bubblegum/75 via-neon/75 to-aurora/75 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.2)]">
                <span className="absolute -left-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-slate-950/90 text-[10px] font-bold text-slate-200">
                  {index + 1}
                </span>
                {player.avatar || fallbackAvatar}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="break-words text-sm font-semibold leading-5 text-white">
                    {player.name}
                  </p>
                  {player.isHost ? (
                    <span className="status-pill border-aurora/25 bg-aurora/10 text-aurora">
                      {t('common.host')}
                    </span>
                  ) : null}
                  {player.id === currentPlayerId ? (
                    <span className="status-pill border-bubblegum/25 bg-bubblegum/10 text-bubblegum">
                      {t('common.you')}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {showScores ? (
              <p className="shrink-0 text-sm font-medium text-slate-300">
                {player.score || 0} {t('common.pts')}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export default PlayerList;
