function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  ...props
}) {
  const variants = {
    primary:
      'bg-gradient-to-r from-bubblegum via-flare to-aurora text-white hover:opacity-90',
    secondary:
      'border border-white/15 bg-white/5 text-white hover:bg-white/10',
    ghost: 'bg-transparent text-slate-200 hover:bg-white/5',
  };

  return (
    <button
      className={[
        'inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-11',
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
