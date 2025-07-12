import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, dueDate);
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
      >
        Add
      </button>
    </form>
  );
}
