import Button from './Button';

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
  const phaseCopy = {
    waiting: isHost
      ? 'Everyone is ready. Spin the bottle to choose the next player.'
      : 'Waiting for the host to spin the bottle.',
    spinning: 'The bottle is spinning. Watch where it lands.',
    choice: selectedPlayerName
      ? `${selectedPlayerName} is choosing between Truth and Dare.`
      : 'Waiting for the selected player to choose.',
    prompt: 'Complete the prompt, then move on when the room is ready.',
    resolved: 'Points locked in. Start the next round when everyone is ready.',
  };

  return (
    <div className="surface-muted space-y-4 p-4 sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="min-w-0">
          <p className="section-kicker">Round Controls</p>
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
          {connectionState}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          onClick={onSpin}
          disabled={!canSpin || isActionPending}
          className="min-h-[4rem] w-full"
        >
          Spin Bottle
        </Button>
        <Button
          variant="secondary"
          onClick={onNextRound}
          disabled={!canNextRound || isActionPending}
          className="min-h-[4rem] w-full"
        >
          Next Round
        </Button>
      </div>

      {!isHost ? (
        <p className="text-xs leading-6 text-slate-500">
          The host controls the spin and round reset for this room.
        </p>
      ) : null}
    </div>
  );
}

export default GameControls;
