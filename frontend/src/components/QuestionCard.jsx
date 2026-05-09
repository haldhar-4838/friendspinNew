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
      <div className="rounded-[1.8rem] border border-dashed border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-slate-400 sm:p-6">
        The next Truth or Dare challenge will appear here after the selected
        player chooses.
      </div>
    );
  }

  const fallbackAvatar = selectedPlayerName?.slice(0, 1).toUpperCase() || 'P';

  return (
    <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-4 shadow-party">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)] blur-2xl" />
      <div className="relative flex flex-wrap items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] bg-gradient-to-br from-bubblegum/70 via-neon/70 to-aurora/70 text-sm font-semibold text-white">
          {selectedPlayerAvatar || fallbackAvatar}
        </span>
        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200">
          {choice}
        </span>
        <span className="break-words text-sm text-slate-300">{selectedPlayerName}</span>
        <span className="rounded-full border border-bubblegum/20 bg-bubblegum/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-bubblegum">
          {modeLabel}
        </span>
      </div>
      <p className="relative mt-4 font-display text-[1.35rem] font-semibold leading-8 tracking-[-0.03em] text-white">
        {prompt}
      </p>
      {roundResult ? (
        <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-slate-200">
          {roundResult.action === 'completed'
            ? `Round scored: +${roundResult.points} points`
            : `${roundResult.points} points applied for skip`}
        </p>
      ) : null}
    </div>
  );
}

export default QuestionCard;
