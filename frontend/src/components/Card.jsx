function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={['glass-panel touch-card p-5 sm:p-7', className].join(' ')}>
      {title ? (
        <div className="mb-5 sm:mb-6">
          <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.03em] text-white sm:text-[1.7rem]">
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
