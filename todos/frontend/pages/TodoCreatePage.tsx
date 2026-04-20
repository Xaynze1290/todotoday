import React from "react";
import { useCreateTodo } from "../hooks";
import TodoForm from "../components/TodoForm";
import type { TodoCreate } from "../types";

export default function TodoCreatePage() {
  const createTodo = useCreateTodo();

  const handleSubmit = async (data: TodoCreate) => {
    await createTodo.mutateAsync(data);
    window.location.href = "/modules/todos";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
        <a href="/modules/todos" className="text-gray-400 hover:text-gray-200">
          &larr; Back
        </a>
        <h1 className="text-2xl font-semibold text-gray-100">Create New Todo</h1>
      </div>
      <TodoForm onSubmit={handleSubmit} isLoading={createTodo.isPending} />
    </div>
  );
}