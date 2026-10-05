const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "done", label: "Done" },
];

export default function FilterBar({ filter, onFilterChange, remaining, hasCompleted, onClearCompleted }) {
  return (
    <div className="filter-bar">
      <div className="filter-tabs" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={`filter-tab ${filter === f.id ? "filter-tab-active" : ""}`}
            onClick={() => onFilterChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="filter-meta">
        <span className="remaining-count">
          {remaining} {remaining === 1 ? "task" : "tasks"} left
        </span>
        {hasCompleted && (
          <button className="clear-btn" onClick={onClearCompleted}>
            Clear done
          </button>
        )}
      </div>
    </div>
  );
}
