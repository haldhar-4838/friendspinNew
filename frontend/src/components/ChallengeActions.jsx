import Button from './Button';

function ChallengeActions({
  canAct,
  onComplete,
  onSkip,
  isSubmitting = false,
  choice,
}) {
  const completeLabel =
    choice === 'dare' ? 'Complete Dare for +20' : 'Complete Truth for +10';

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button
        onClick={onComplete}
        disabled={!canAct || isSubmitting}
        className="min-h-[4.25rem] w-full flex-col"
      >
        <span>Done</span>
        <span className="text-xs font-medium text-white/75">{completeLabel}</span>
      </Button>
      <Button
        variant="secondary"
        onClick={onSkip}
        disabled={!canAct || isSubmitting}
        className="min-h-[4.25rem] w-full flex-col"
      >
        <span>Skip</span>
        <span className="text-xs font-medium text-slate-300">Lose 5 points</span>
      </Button>
    </div>
  );
}

export default ChallengeActions;
