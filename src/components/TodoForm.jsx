import { useState } from "react";

const PRIORITIES = [
  { id: "low", label: "P3", color: "var(--ink-dim)" },
  { id: "medium", label: "P2", color: "var(--ochre)" },
  { id: "high", label: "P1", color: "var(--brick)" },
];

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority);
    setText("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a task, press enter to add…"
        aria-label="New task"
      />
      <div className="priority-picker" role="radiogroup" aria-label="Priority">
        {PRIORITIES.map((p) => (
          <button
            type="button"
            key={p.id}
            role="radio"
            aria-checked={priority === p.id}
            className={`priority-dot ${priority === p.id ? "priority-dot-active" : ""}`}
            style={{ "--dot-color": p.color }}
            onClick={() => setPriority(p.id)}
            title={`Priority ${p.label}`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <button type="submit" className="add-btn" aria-label="Add task">
        +
      </button>
    </form>
  );
}
