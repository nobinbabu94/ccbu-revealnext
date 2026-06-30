"use client";

export function FilterBar({
  regionFilter,
  stateFilter,
  districtFilter,
  regions,
  states,
  districts,
  hasFilters,
  onRegionChange,
  onStateChange,
  onDistrictChange,
  onClearFilters,
  theme,
}) {
  const { bg, bgSub, border, textPri, textSec, accent } = theme;

  const selProps = {
    style: { backgroundColor: bgSub, borderColor: border, color: textPri },
    className: "rounded-lg border px-3 py-2.5 text-sm outline-none appearance-none cursor-pointer transition",
    onFocus: (e) => (e.currentTarget.style.borderColor = accent),
    onBlur: (e) => (e.currentTarget.style.borderColor = border),
  };

  return (
    <div
      style={{ backgroundColor: bg, borderColor: border }}
      className="rounded-xl border px-4 py-4 mb-6 flex flex-wrap items-center gap-3"
    >
      <select value={regionFilter} onChange={onRegionChange} {...selProps}>
        <option value="">All Regions</option>
        {regions.map((r) => <option key={r}>{r}</option>)}
      </select>

      <select value={stateFilter} onChange={onStateChange} {...selProps}>
        <option value="">All States</option>
        {states.map((s) => <option key={s}>{s}</option>)}
      </select>

      <select value={districtFilter} onChange={onDistrictChange} {...selProps}>
        <option value="">All Districts</option>
        {districts.map((d) => <option key={d}>{d}</option>)}
      </select>

      {hasFilters && (
        <button
          onClick={onClearFilters}
          style={{ color: accent, borderColor: border }}
          className="px-4 py-2.5 rounded-lg border text-sm font-medium hover:opacity-70 transition ml-auto"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}