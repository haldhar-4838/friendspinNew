function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={['glass-panel p-6 sm:p-7', className].join(' ')}>
      {title ? (
        <div className="mb-5">
          <h2 className="font-display text-2xl font-semibold text-white">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-xl text-sm text-slate-300">{subtitle}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export default Card;
