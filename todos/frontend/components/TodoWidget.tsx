import React from "react";
import type { FrontendWidgetRendererProps } from "@every-dash/module-sdk";
import { Link } from "react-router-dom";
import { useUpdateTodo } from "../hooks";

interface TodoWidgetItem {
  id: number;
  title: string;
  is_complete: boolean;
  due_date: string | null;
  updated_at: string;
}

export function OpenTodosWidget({ widget }: FrontendWidgetRendererProps) {
  const todos = (widget.data as TodoWidgetItem[]) ?? [];
  const updateTodo = useUpdateTodo();

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-4 text-center">
        <p>No open todos!</p>
        <Link
          to="/modules/todos/new"
          className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
        >
          Create one
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ul className="divide-y divide-slate-700/50 overflow-y-auto flex-1 p-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between py-2 group"
          >
            <div className="flex items-center gap-3 truncate">
              <input
                type="checkbox"
                checked={todo.is_complete}
                onChange={(e) =>
                  updateTodo.mutate({
                    id: todo.id,
                    data: { is_complete: e.target.checked },
                  })
                }
                className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-blue-600 focus:ring-blue-500 shrink-0"
              />
              <Link
                to={`/modules/todos/${todo.id}`}
                className="truncate text-sm font-medium hover:text-blue-400 transition-colors"
                title={todo.title}
              >
                {todo.title}
              </Link>
            </div>
            {todo.due_date && (
              <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                {new Date(todo.due_date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="p-2 border-t border-slate-700/50 mt-auto bg-slate-800/50">
        <Link
          to="/modules/todos"
          className="text-xs text-blue-400 hover:text-blue-300 block text-center"
        >
          View all todos
        </Link>
      </div>
    </div>
  );
}
