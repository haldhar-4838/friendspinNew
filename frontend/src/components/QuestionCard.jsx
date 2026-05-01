function QuestionCard({
  selectedPlayerName,
  selectedPlayerAvatar,
  choice,
  prompt,
  modeLabel,
  roundResult,
}) {
  if (!choice || !prompt) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-6 text-sm leading-7 text-slate-400">
        The next Truth or Dare challenge will appear here after the selected
        player makes a choice.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.03] p-6 shadow-party">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
          {selectedPlayerAvatar || '🙂'}
        </span>
        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200">
          {choice}
        </span>
        <span className="text-sm text-slate-300">{selectedPlayerName}</span>
        <span className="rounded-full border border-bubblegum/20 bg-bubblegum/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-bubblegum">
          {modeLabel}
        </span>
      </div>
      <p className="mt-5 font-display text-2xl font-semibold leading-9 text-white">
        {prompt}
      </p>
      {roundResult ? (
        <p className="mt-4 text-sm text-slate-300">
          {roundResult.action === 'completed'
            ? `Round scored: +${roundResult.points} points`
            : `${roundResult.points} points applied for skip`}
        </p>
      ) : null}
    </div>
  );
}

export default QuestionCard;
