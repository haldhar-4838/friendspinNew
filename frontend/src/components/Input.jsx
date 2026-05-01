function Input({ label, helperText, className = '', ...props }) {
  return (
    <label className="flex w-full flex-col gap-2">
      {label ? (
        <span className="text-sm font-medium text-slate-200">{label}</span>
      ) : null}
      <input
        className={[
          'w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-bubblegum/60 focus:ring-2 focus:ring-bubblegum/25',
          className,
        ].join(' ')}
        {...props}
      />
      {helperText ? (
        <span className="text-xs text-slate-400">{helperText}</span>
      ) : null}
    </label>
  );
}

export default Input;
