import React from "react";
import { useTodos, useUpdateTodo } from "../hooks";

export default function TodosListPage() {
  const { data: todos, isLoading } = useTodos();
  const updateTodo = useUpdateTodo();

  const handleToggleComplete = (id: number, is_complete: boolean) => {
    updateTodo.mutate({ id, data: { is_complete: !is_complete } });
  };

  if (isLoading) return <div className="p-8 text-gray-400">Loading todos...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-semibold text-gray-100">Todos</h1>
        <a
          href="/modules/todos/new"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          + Add Todo
        </a>
      </div>

      <div className="flex flex-col gap-3">
        {todos?.length === 0 ? (
          <div className="text-center py-10 bg-gray-800 rounded-lg border border-gray-700 text-gray-400">
            No todos found. Create one to get started.
          </div>
        ) : (
          todos?.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center p-4 bg-gray-800 border rounded-lg transition-colors ${
                todo.is_complete ? "border-gray-700 opacity-60" : "border-gray-600 hover:border-gray-500"
              }`}
            >
              <input
                type="checkbox"
                checked={todo.is_complete}
                onChange={() => handleToggleComplete(todo.id, todo.is_complete)}
                className="h-5 w-5 rounded border-gray-600 bg-gray-900 text-blue-600 focus:ring-blue-500 mr-4 cursor-pointer"
              />
              <div className="flex-1">
                <a
                  href={`/modules/todos/${todo.id}`}
                  className={`block font-medium hover:underline ${
                    todo.is_complete ? "text-gray-400 line-through" : "text-gray-100"
                  }`}
                >
                  {todo.title}
                </a>
                {todo.due_date && (
                  <span className="text-xs text-gray-400 block mt-1">
                    Due: {new Date(todo.due_date).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {todo.priority === 3 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-red-900/50 text-red-300 border border-red-800">
                    High
                  </span>
                )}
                {todo.priority === 2 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-900/50 text-yellow-300 border border-yellow-800">
                    Medium
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}