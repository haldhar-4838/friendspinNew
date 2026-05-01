function ModeSelect({ label, value, options = [], onChange }) {
  return (
    <label className="flex w-full flex-col gap-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-bubblegum/60 focus:ring-2 focus:ring-bubblegum/25"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} className="bg-slate-900">
            {option.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-slate-400">
        {options.find((option) => option.id === value)?.description}
      </p>
    </label>
  );
}

export default ModeSelect;
