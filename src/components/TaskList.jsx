import { useState } from "react";

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleEdit = (task) => {
    if (task.completed) return;
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const handleSubmit = (id) => {
    if (editTitle.trim()) {
      onEdit(id, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle("");
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleSubmit(id);
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditTitle("");
    }
  };

  if (!tasks.length)
    return <p className="text-center text-gray-400">No tasks yet.</p>;

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded"
        >
          {editingId === task.id ? (
            <input
              className="flex-1 mr-2 px-2 py-1 rounded bg-gray-700 text-white focus:outline-none"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => handleSubmit(task.id)}
              onKeyDown={(e) => handleKeyDown(e, task.id)}
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 mr-2 cursor-pointer ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
              onClick={() => handleEdit(task)}
            >
              {task.title}
            </span>
          )}

          <span
            className={`flex-1 mr-2 cursor-pointer ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
            onClick={() => handleEdit(task)}
          >
            
            {task.dueDate && (
              <div className="text-xs text-gray-400 mt-1">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </span>

          <button
            onClick={() => onToggle(task.id)}
            className="text-green-400 hover:text-green-300 font-semibold mr-2"
            title="Toggle Complete"
          >
            ✔
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-400 hover:text-red-600 font-semibold"
            title="Delete Task"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
