function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  ...props
}) {
  const variants = {
    primary:
      'border border-[#ff5d8f]/18 bg-[linear-gradient(180deg,rgba(30,13,41,0.98),rgba(20,11,31,0.98)),radial-gradient(circle_at_top,rgba(255,92,145,0.24),transparent_52%)] text-white shadow-[0_26px_58px_-24px_rgba(255,77,129,0.34),inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-0.5 hover:border-[#ff5d8f]/28 hover:brightness-110 disabled:hover:translate-y-0',
    secondary:
      'border border-white/[0.12] bg-[linear-gradient(180deg,rgba(17,13,28,0.96),rgba(11,9,20,0.96))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_42px_-30px_rgba(0,0,0,0.92)] hover:-translate-y-0.5 hover:border-white/20 hover:bg-[linear-gradient(180deg,rgba(23,18,36,0.98),rgba(13,10,24,0.98))] disabled:hover:translate-y-0',
    ghost:
      'border border-transparent bg-transparent text-slate-200 hover:border-white/10 hover:bg-white/5 hover:text-white',
    whatsapp:
      'border border-emerald-300/16 bg-[linear-gradient(180deg,rgba(8,54,42,0.98),rgba(5,38,30,0.98))] text-white shadow-[0_24px_50px_-24px_rgba(16,185,129,0.34),inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-0.5 hover:border-emerald-300/28 hover:brightness-105 disabled:hover:translate-y-0',
  };

  return (
    <button
      className={[
        'touch-button relative inline-flex min-h-[3.4rem] items-center justify-center gap-2 overflow-hidden rounded-[1.25rem] px-4 py-3 text-sm font-semibold tracking-[0.01em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-55 sm:min-h-[3.6rem]',
        variant === 'primary' ? 'button-primary-neon' : '',
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
