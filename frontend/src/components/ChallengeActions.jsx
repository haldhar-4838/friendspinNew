import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

function ChallengeActions({
  canAct,
  onComplete,
  onSkip,
  isSubmitting = false,
  choice,
}) {
  const { t } = useLanguage();
  const completeLabel =
    choice === 'dare'
      ? t('challengeActions.completeDare')
      : t('challengeActions.completeTruth');

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button
        onClick={onComplete}
        disabled={!canAct || isSubmitting}
        className="min-h-[4.5rem] w-full flex-col rounded-[1.7rem]"
      >
        <span>{t('common.done')}</span>
        <span className="text-xs font-medium text-white/75">{completeLabel}</span>
      </Button>
      <Button
        variant="secondary"
        onClick={onSkip}
        disabled={!canAct || isSubmitting}
        className="min-h-[4.5rem] w-full flex-col rounded-[1.7rem]"
      >
        <span>{t('common.skip')}</span>
        <span className="text-xs font-medium text-slate-300">{t('challengeActions.losePoints')}</span>
      </Button>
    </div>
  );
}

export default ChallengeActions;
