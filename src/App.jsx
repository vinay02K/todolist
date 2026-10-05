import { useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";
import "./App.css";

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("ledger.todos", []);
  const [filter, setFilter] = useState("all");

  function addTodo(text, priority) {
    setTodos((prev) => [...prev, { id: makeId(), text, priority, completed: false, createdAt: Date.now() }]);
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, text) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "done") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="page">
      <div className="ledger">
        <header className="ledger-header">
          <h1 className="ledger-title">Today's tasks</h1>
          <p className="ledger-date">{today}</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          remaining={remaining}
          hasCompleted={hasCompleted}
          onClearCompleted={clearCompleted}
        />

        <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
      </div>
    </div>
  );
}
