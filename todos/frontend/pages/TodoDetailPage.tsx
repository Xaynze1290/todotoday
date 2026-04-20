import React from "react";
import { useTodo, useDeleteTodo } from "../hooks";

export default function TodoDetailPage() {
  const idMatch = window.location.pathname.match(/\/modules\/todos\/(\d+)/);
  const todoId = idMatch ? parseInt(idMatch[1], 10) : 0;

  const { data: todo, isLoading } = useTodo(todoId);
  const deleteTodo = useDeleteTodo();

  if (isLoading) return <div className="p-8 text-gray-400">Loading...</div>;
  if (!todo) return <div className="p-8 text-red-400">Todo not found</div>;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      await deleteTodo.mutateAsync(todo.id);
      window.location.href = "/modules/todos";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <div className="flex items-center gap-3">
          <a href="/modules/todos" className="text-gray-400 hover:text-gray-200">
            &larr; Back
          </a>
          <h1 className="text-2xl font-semibold text-gray-100">Todo Details</h1>
        </div>
        <div className="flex gap-2">
          <a
            href={`/modules/todos/${todo.id}/edit`}
            className="bg-gray-700 hover:bg-gray-600 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors border border-gray-600"
          >
            Edit
          </a>
          <button
            onClick={handleDelete}
            className="bg-red-900/80 hover:bg-red-800 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors border border-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 space-y-4">
        <div>
          <h2 className={`text-xl font-medium ${todo.is_complete ? "text-gray-400 line-through" : "text-gray-100"}`}>
            {todo.title}
          </h2>
          <div className="flex gap-2 mt-2">
            <span className={`px-2 py-1 text-xs rounded-full border ${
              todo.is_complete ? "bg-green-900/50 border-green-800 text-green-300" : "bg-blue-900/50 border-blue-800 text-blue-300"
            }`}>
              {todo.is_complete ? "Completed" : "Open"}
            </span>
            <span className="px-2 py-1 text-xs rounded-full border bg-gray-900 border-gray-700 text-gray-300">
              Priority: {todo.priority}
            </span>
          </div>
        </div>

        {todo.description && (
          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
            <p className="text-gray-200 whitespace-pre-wrap">{todo.description}</p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <span className="block font-medium mb-1">Due Date</span>
            {todo.due_date ? new Date(todo.due_date).toLocaleString() : "None"}
          </div>
          <div>
            <span className="block font-medium mb-1">Created At</span>
            {new Date(todo.created_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}