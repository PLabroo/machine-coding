import { useEffect, useState } from "react";
import { getTodosFromDB, saveTodosToDB } from "./indexDB";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [useIndexedDB, setUseIndexedDB] = useState(false);

  /* ---------- LOAD ---------- */
  useEffect(() => {
    if (useIndexedDB) {
      getTodosFromDB().then(setTodos);
    } else {
      const saved = localStorage.getItem("todos");
      if (saved) setTodos(JSON.parse(saved));
    }
  }, [useIndexedDB]);

  /* ---------- SAVE ---------- */
  useEffect(() => {
    if (useIndexedDB) {
      saveTodosToDB(todos);
    } else {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, useIndexedDB]);

  /* ---------- ACTIONS ---------- */
  const addOrEditTodo = () => {
    if (!input.trim()) return;

    if (editingId !== null) {
      setTodos(todos.map(t =>
        t.id === editingId ? { ...t, text: input } : t
      ));
      setEditingId(null);
    } else {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
    }
    setInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setInput(todo.text);
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">

        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>

        {/* Storage Toggle */}
        <div className="flex justify-center mb-4 gap-2 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={useIndexedDB}
              onChange={() => setUseIndexedDB(!useIndexedDB)}
            />
            Use IndexedDB
          </label>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded px-2 py-1"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter todo..."
          />
          <button
            onClick={addOrEditTodo}
            className="bg-blue-500 text-white px-4 rounded"
          >
            {editingId !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between border p-2 rounded"
            >
              <span
                onClick={() => toggleComplete(todo.id)}
                className={`flex-1 cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(todo)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
