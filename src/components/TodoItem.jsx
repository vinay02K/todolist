import { useState, useRef, useEffect } from "react";

const PRIORITY_LABEL = { low: "P3", medium: "P2", high: "P1" };
const PRIORITY_VAR = { low: "var(--ink-dim)", medium: "var(--ochre)", high: "var(--brick)" };

export default function TodoItem({ todo, index, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  function commitEdit() {
    const trimmed = draft.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
    } else {
      setDraft(todo.text);
    }
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") {
      setDraft(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <li className={`todo-row ${todo.completed ? "todo-row-done" : ""}`}>
      <span className="todo-index">{String(index + 1).padStart(2, "0")}</span>

      <button
        className={`todo-check ${todo.completed ? "todo-check-done" : ""}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark as not done" : "Mark as done"}
      >
        {todo.completed && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          className="todo-edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <span
        className="todo-priority"
        style={{ color: PRIORITY_VAR[todo.priority] }}
        title={`Priority ${PRIORITY_LABEL[todo.priority]}`}
      >
        {PRIORITY_LABEL[todo.priority]}
      </span>

      <button className="todo-delete" onClick={() => onDelete(todo.id)} aria-label="Delete task">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </li>
  );
}
