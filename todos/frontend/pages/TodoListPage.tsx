import React from "react";
import { Link } from "react-router-dom";
import { useTodos, useUpdateTodo, useDeleteTodo } from "../hooks";

export function TodoListPage() {
  const { data: todos, isLoading } = useTodos();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  if (isLoading) {
    return <div className="p-6">Loading todos...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todos</h1>
        <Link
          to="/modules/todos/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow text-sm font-medium transition-colors"
        >
          New Todo
        </Link>
      </div>

      <div className="bg-slate-800 rounded-lg shadow overflow-hidden border border-slate-700">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-300">Status</th>
              <th className="px-4 py-3 font-medium text-slate-300">Title</th>
              <th className="px-4 py-3 font-medium text-slate-300">Priority</th>
              <th className="px-4 py-3 font-medium text-slate-300">Due</th>
              <th className="px-4 py-3 font-medium text-slate-300 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {todos?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No todos found. Create one to get started!
                </td>
              </tr>
            ) : (
              todos?.map((todo) => (
                <tr key={todo.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={todo.is_complete}
                      onChange={(e) =>
                        updateTodo.mutate({
                          id: todo.id,
                          data: { is_complete: e.target.checked },
                        })
                      }
                      className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/modules/todos/${todo.id}`}
                      className={`hover:text-blue-400 transition-colors ${
                        todo.is_complete ? "line-through text-slate-500" : "font-medium"
                      }`}
                    >
                      {todo.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {todo.priority === 2
                      ? "High"
                      : todo.priority === 1
                      ? "Medium"
                      : "Low"}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {todo.due_date ? new Date(todo.due_date).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this todo?")) {
                          deleteTodo.mutate(todo.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
