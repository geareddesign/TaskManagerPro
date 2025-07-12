import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ProgressCircle from "./components/ProgressCircle";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, dueDate) => {
  const newTask = {
    id: Date.now(),
    title,
    dueDate,
    completed: false,
  };
  setTasks([newTask, ...tasks]);
};


  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-12">📝 Task Manager Pro</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Circle on the left */}
        <div className="flex justify-center items-start">
          <ProgressCircle completed={completedCount} total={tasks.length} />
        </div>

        {/* Form and Task list full width */}
        <div className="lg:col-span-2 space-y-6">
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
