import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">Nothing on the page yet</p>
        <p className="empty-sub">Add a task above to start your list.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo, i) => (
        <TodoItem key={todo.id} todo={todo} index={i} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}
