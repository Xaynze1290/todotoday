import React from "react";

// Assuming standard platform injection where dashboard passes the widget data
interface TodosWidgetProps {
  data?: {
    id: number;
    title: string;
    is_complete: boolean;
    priority: number;
    due_date: string | null;
  }[];
}

export default function TodosWidget({ data }: TodosWidgetProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        No open todos. You're all caught up!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      {data.map((todo) => (
        <a
          key={todo.id}
          href={`/modules/todos/${todo.id}`}
          className="flex flex-col p-3 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-gray-100">{todo.title}</span>
            {todo.priority === 3 && (
              <span className="text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded-full border border-red-800">
                High
              </span>
            )}
          </div>
          {todo.due_date && (
            <span className="text-xs text-gray-400">
              Due: {new Date(todo.due_date).toLocaleDateString()}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}