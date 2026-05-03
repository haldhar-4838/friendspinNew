import Button from './Button';

function ChoiceModal({
  isOpen,
  selectedPlayer,
  isCurrentPlayerTurn,
  isSubmitting = false,
  onChoose,
  secondsLeft,
  modeLabel,
}) {
  if (!isOpen || !selectedPlayer) {
    return null;
  }

  const fallbackAvatar = selectedPlayer.name.slice(0, 1).toUpperCase();

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg p-5 sm:p-8">
        <p className="section-kicker">Selected Player</p>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-bubblegum/80 via-neon/80 to-aurora/80 text-2xl font-bold text-white shadow-party">
            {selectedPlayer.avatar || fallbackAvatar}
          </div>
          <div className="min-w-0">
            <h3 className="break-words font-display text-2xl font-bold text-white sm:text-3xl">
              {selectedPlayer.name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
              {modeLabel}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          {isCurrentPlayerTurn
            ? 'It is your turn. Pick Truth or Dare and the room will see your challenge instantly.'
            : `${selectedPlayer.name} is choosing between Truth and Dare right now.`}
        </p>
        <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Auto-picks in
          </p>
          <p className="mt-1 font-display text-3xl font-bold text-white">
            {secondsLeft}s
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            onClick={() => onChoose('truth')}
            disabled={!isCurrentPlayerTurn || isSubmitting}
            className="min-h-[5rem] w-full flex-col rounded-[1.7rem] bg-[linear-gradient(135deg,rgba(139,92,246,0.96),rgba(236,72,153,0.95),rgba(34,211,238,0.88))]"
          >
            <span className="text-base">Truth</span>
            <span className="text-xs font-medium text-white/75">Stay honest</span>
          </Button>
          <Button
            onClick={() => onChoose('dare')}
            disabled={!isCurrentPlayerTurn || isSubmitting}
            variant="secondary"
            className="min-h-[5rem] w-full flex-col rounded-[1.7rem] border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(139,92,246,0.18))]"
          >
            <span className="text-base">Dare</span>
            <span className="text-xs font-medium text-slate-200">Take the risk</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChoiceModal;
