function GameCard({ title, description, accent = 'from-neon to-bubblegum' }) {
  return (
    <div className="glass-panel touch-card overflow-hidden">
      <div className={`h-1.5 w-full bg-gradient-to-r ${accent}`} />
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
      </div>
    </div>
  );
}

export default GameCard;
