function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-300">
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/15 border-t-bubblegum" />
        <span className="h-2 w-2 rounded-full bg-bubblegum shadow-[0_0_14px_rgba(236,72,153,0.85)]" />
      </span>
      <span>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
