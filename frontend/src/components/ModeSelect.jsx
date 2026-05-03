function ModeSelect({ label, value, options = [], onChange }) {
  return (
    <label className="flex w-full flex-col gap-2.5">
      <span className="text-sm font-medium tracking-[0.01em] text-slate-100">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-[1.45rem] border border-white/10 bg-white/[0.05] px-4 py-4 text-base text-white outline-none transition focus:border-bubblegum/60 focus:ring-2 focus:ring-bubblegum/25"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} className="bg-slate-900">
            {option.label}
          </option>
        ))}
      </select>
      <p className="px-1 text-xs leading-5 text-slate-400">
        {options.find((option) => option.id === value)?.description}
      </p>
    </label>
  );
}

export default ModeSelect;
