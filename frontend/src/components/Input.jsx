function Input({
  label,
  helperText,
  state = 'default',
  className = '',
  ...props
}) {
  const stateStyles = {
    default: 'border-white/10 focus:border-bubblegum/60 focus:ring-bubblegum/25',
    error: 'border-red-400/40 focus:border-red-300 focus:ring-red-400/20',
    success: 'border-aurora/40 focus:border-aurora/60 focus:ring-aurora/25',
  };

  const helperStyles = {
    default: 'text-slate-400',
    error: 'text-red-200',
    success: 'text-aurora',
  };

  return (
    <label className="flex w-full flex-col gap-2.5">
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
          {label}
        </span>
      ) : null}
      <input
        className={[
          'w-full rounded-[1.4rem] border bg-white/[0.06] px-4 py-4 text-base text-white outline-none ring-2 ring-transparent transition placeholder:text-slate-500 focus:ring-2',
          stateStyles[state],
          className,
        ].join(' ')}
        {...props}
      />
      {helperText ? (
        <span className={['px-1 text-xs leading-5', helperStyles[state]].join(' ')}>
          {helperText}
        </span>
      ) : null}
    </label>
  );
}

export default Input;
