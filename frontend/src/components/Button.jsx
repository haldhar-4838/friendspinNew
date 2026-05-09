function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  ...props
}) {
  const variants = {
    primary:
      'border border-white/10 bg-[linear-gradient(135deg,rgba(139,92,246,0.98),rgba(236,72,153,0.96),rgba(34,211,238,0.92))] text-white shadow-[0_26px_58px_-22px_rgba(139,92,246,0.8)] hover:-translate-y-0.5 hover:brightness-110 disabled:hover:translate-y-0',
    secondary:
      'border border-white/[0.14] bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.12] disabled:hover:translate-y-0',
    ghost:
      'border border-transparent bg-transparent text-slate-200 hover:border-white/10 hover:bg-white/5 hover:text-white',
    whatsapp:
      'border border-emerald-300/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.96),rgba(5,150,105,0.94))] text-white shadow-[0_24px_50px_-20px_rgba(16,185,129,0.65)] hover:-translate-y-0.5 hover:brightness-105 disabled:hover:translate-y-0',
  };

  return (
    <button
      className={[
        'touch-button relative inline-flex min-h-[3.5rem] items-center justify-center gap-2 overflow-hidden rounded-[1.35rem] px-4 py-3 text-sm font-semibold tracking-[0.01em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-55',
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
