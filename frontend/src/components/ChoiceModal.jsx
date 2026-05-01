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

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg p-5 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
          Selected Player
        </p>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-bubblegum/80 via-flare/80 to-aurora/80 text-3xl shadow-party">
            {selectedPlayer.avatar || '🙂'}
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
            className="min-h-14 w-full"
          >
            Truth
          </Button>
          <Button
            onClick={() => onChoose('dare')}
            disabled={!isCurrentPlayerTurn || isSubmitting}
            variant="secondary"
            className="min-h-14 w-full"
          >
            Dare
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChoiceModal;
