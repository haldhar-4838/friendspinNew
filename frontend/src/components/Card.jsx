function Card({ title, subtitle, children, className = '' }) {
  return (
    <section
      className={[
        'glass-panel touch-card p-4 sm:p-5',
        className,
      ].join(' ')}
    >
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {title ? (
        <div className="mb-4 sm:mb-5">
          <h2 className="font-display text-[1.35rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.5rem]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export default Card;
