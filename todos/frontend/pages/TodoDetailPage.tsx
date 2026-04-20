import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTodo, useUpdateTodo } from "../hooks";

export function TodoDetailPage() {
  const { todoId } = useParams<{ todoId: string }>();
  const id = Number(todoId);
  const navigate = useNavigate();

  const { data: todo, isLoading } = useTodo(id);
  const updateTodo = useUpdateTodo();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || "");
      setPriority(todo.priority);
      setDueDate(todo.due_date ? todo.due_date.split("T")[0] : "");
      setIsComplete(todo.is_complete);
    }
  }, [todo]);

  if (isLoading) {
    return <div className="p-6">Loading todo...</div>;
  }

  if (!todo) {
    return <div className="p-6 text-red-400">Todo not found.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTodo.mutate(
      {
        id,
        data: {
          title,
          description: description || null,
          priority,
          due_date: dueDate ? new Date(dueDate).toISOString() : null,
          is_complete: isComplete,
        },
      },
      {
        onSuccess: () => navigate("/modules/todos"),
      }
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/modules/todos"
          className="text-slate-400 hover:text-white transition-colors"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold">Edit Todo</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-lg shadow border border-slate-700 space-y-4"
      >
        <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-slate-700">
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
            className="w-5 h-5 rounded border-slate-500 bg-slate-700 text-blue-600 focus:ring-blue-500"
            id="isComplete"
          />
          <label htmlFor="isComplete" className="text-sm font-medium text-slate-300">
            Mark as Complete
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center text-sm text-slate-500 border-t border-slate-700 mt-4">
          <span>Created: {new Date(todo.created_at).toLocaleString()}</span>
          <span>Updated: {new Date(todo.updated_at).toLocaleString()}</span>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={updateTodo.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow text-sm font-medium transition-colors disabled:opacity-50"
          >
            {updateTodo.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
