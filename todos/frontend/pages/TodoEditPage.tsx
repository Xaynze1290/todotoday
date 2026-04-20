import React from "react";
import { useTodo, useUpdateTodo } from "../hooks";
import TodoForm from "../components/TodoForm";
import type { TodoCreate } from "../types";

export default function TodoEditPage() {
  const idMatch = window.location.pathname.match(/\/modules\/todos\/(\d+)\/edit/);
  const todoId = idMatch ? parseInt(idMatch[1], 10) : 0;

  const { data: todo, isLoading } = useTodo(todoId);
  const updateTodo = useUpdateTodo();

  const handleSubmit = async (data: TodoCreate) => {
    await updateTodo.mutateAsync({ id: todoId, data });
    window.location.href = `/modules/todos/${todoId}`;
  };

  if (isLoading) return <div className="p-8 text-gray-400">Loading...</div>;
  if (!todo) return <div className="p-8 text-red-400">Todo not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
        <a href={`/modules/todos/${todoId}`} className="text-gray-400 hover:text-gray-200">
          &larr; Back
        </a>
        <h1 className="text-2xl font-semibold text-gray-100">Edit Todo</h1>
      </div>
      <TodoForm initialData={todo} onSubmit={handleSubmit} isLoading={updateTodo.isPending} />
    </div>
  );
}