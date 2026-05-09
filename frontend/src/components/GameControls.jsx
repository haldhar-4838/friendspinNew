import Button from './Button';
import { useLanguage } from '../context/LanguageContext';

function GameControls({
  phase,
  isHost,
  canSpin,
  canNextRound,
  onSpin,
  onNextRound,
  selectedPlayerName,
  connectionState,
  isActionPending = false,
}) {
  const { t } = useLanguage();
  const phaseCopy = {
    waiting: isHost
      ? t('game.roundControlsHost')
      : t('game.roundControlsGuest'),
    spinning: t('game.roundControlsSpinning'),
    choice: selectedPlayerName
      ? t('game.roundControlsChoice', { name: selectedPlayerName })
      : t('game.roundControlsChoiceFallback'),
    prompt: t('game.roundControlsPrompt'),
    resolved: t('game.roundControlsResolved'),
  };

  return (
    <div className="surface-muted space-y-4 p-4">
      <div className="flex flex-col gap-3">
        <div className="min-w-0 flex-1">
          <p className="section-kicker">{t('game.roundControls')}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {phaseCopy[phase] || phaseCopy.waiting}
          </p>
        </div>
        <span
          className={[
            'status-pill self-start',
            connectionState === 'connected'
              ? 'border-aurora/30 bg-aurora/10 text-aurora'
              : 'border-yellow-400/30 bg-yellow-400/10 text-yellow-200',
          ].join(' ')}
        >
          {connectionState === 'connected'
            ? t('common.connectionConnected')
            : t('common.connectionDisconnected')}
        </span>
      </div>

      <div className="grid gap-3">
        <Button
          onClick={onSpin}
          disabled={!canSpin || isActionPending}
          className="min-h-[3.9rem] w-full text-base"
        >
          {t('game.spinToPlay')}
        </Button>
        <Button
          variant="secondary"
          onClick={onNextRound}
          disabled={!canNextRound || isActionPending}
          className="min-h-[3.9rem] w-full text-base"
        >
          {t('game.nextRound')}
        </Button>
      </div>

      {!isHost ? (
        <p className="text-xs leading-6 text-slate-500">
          {t('game.hostControlsRound')}
        </p>
      ) : null}
    </div>
  );
}

export default GameControls;
