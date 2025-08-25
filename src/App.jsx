import { useState } from "react";
import { Trash2, Edit3, Save } from "lucide-react"; // librería íconos


function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, done: !t.done } : t
      )
    );
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, text: editText } : t
      )
    );
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-[url('/src/assets/doodlesedited.png')] flex items-center justify-center">



      <div className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-96 border border-white/20">

        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

        {/* Input para nueva tarea */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-1 border rounded-xl px-3 py-2"
            placeholder="Escribe una tarea..."
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition"
          >
            Agregar
          </button>
        </div>

        {/* Lista de tareas */}
        <ul>
          {tasks.map((t, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-white/70 px-3 py-2 mb-2 rounded-xl hover:scale-105 transition"
            >
              {editIndex === i ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(i)}
                  className="flex-1 border px-2 py-1 rounded mr-2"
                />
              ) : (
                <span
                  onClick={() => toggleDone(i)}
                  className={`flex-1 cursor-pointer ${
                    t.done ? "line-through text-gray-500" : ""
                  }`}
                >
                  {t.text}
                </span>
              )}

              {editIndex === i ? (
                <button
                  onClick={() => saveEdit(i)}
                  className="text-green-600 hover:text-green-800 ml-2"
                >
                  <Save size={20} />
                </button>
              ) : (
                <button
                  onClick={() => startEdit(i)}
                  className="text-yellow-500 hover:text-yellow-700 ml-2"
                >
                  <Edit3 size={20} />
                </button>
              )}

              <button
                onClick={() => deleteTask(i)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
