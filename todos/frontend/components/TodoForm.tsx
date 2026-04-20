import React, { useState } from "react";
import type { TodoCreate } from "../types";

interface TodoFormProps {
  initialData?: Partial<TodoCreate>;
  onSubmit: (data: TodoCreate) => void;
  isLoading?: boolean;
}

export default function TodoForm({ initialData, onSubmit, isLoading }: TodoFormProps) {
  const [formData, setFormData] = useState<TodoCreate>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    is_complete: initialData?.is_complete || false,
    priority: initialData?.priority ?? 1,
    due_date: initialData?.due_date || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg border border-gray-700">
      <div>
        <label className="block text-sm font-medium text-gray-300">Title</label>
        <input
          required
          type="text"
          className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300">Priority</label>
          <select
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value, 10) })}
          >
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300">Due Date</label>
          <input
            type="datetime-local"
            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.due_date ? formData.due_date.slice(0, 16) : ""}
            onChange={(e) => {
              const dt = e.target.value ? new Date(e.target.value).toISOString() : undefined;
              setFormData({ ...formData, due_date: dt });
            }}
          />
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input
          id="is_complete"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-900"
          checked={formData.is_complete}
          onChange={(e) => setFormData({ ...formData, is_complete: e.target.checked })}
        />
        <label htmlFor="is_complete" className="ml-2 block text-sm text-gray-300">
          Mark as complete
        </label>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Todo"}
        </button>
      </div>
    </form>
  );
}