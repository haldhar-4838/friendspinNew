function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  ...props
}) {
  const variants = {
    primary:
      'border border-white/10 bg-[linear-gradient(135deg,rgba(236,72,153,0.92),rgba(249,115,22,0.92),rgba(16,185,129,0.9))] text-white shadow-[0_20px_44px_-20px_rgba(249,115,22,0.7)] hover:brightness-110',
    secondary:
      'border border-white/[0.14] bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/20 hover:bg-white/[0.12]',
    ghost:
      'border border-transparent bg-transparent text-slate-200 hover:border-white/10 hover:bg-white/5 hover:text-white',
  };

  return (
    <button
      className={[
        'touch-button inline-flex min-h-[3.35rem] items-center justify-center gap-2 rounded-[1.35rem] px-5 py-3.5 text-sm font-semibold tracking-[0.01em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[3.1rem]',
        variants[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
