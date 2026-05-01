import Button from './Button';

function ChallengeActions({
  canAct,
  onComplete,
  onSkip,
  isSubmitting = false,
  choice,
}) {
  const completeLabel =
    choice === 'dare' ? 'Complete Dare +20' : 'Complete Truth +10';

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button onClick={onComplete} disabled={!canAct || isSubmitting} className="w-full">
        {completeLabel}
      </Button>
      <Button
        variant="secondary"
        onClick={onSkip}
        disabled={!canAct || isSubmitting}
        className="w-full"
      >
        Skip -5
      </Button>
    </div>
  );
}

export default ChallengeActions;
