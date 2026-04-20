import { apiRequest } from "@every-dash/module-sdk";

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  is_complete: boolean;
  priority: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export type TodoCreate = Omit<Todo, "id" | "created_at" | "updated_at">;
export type TodoUpdate = Partial<TodoCreate>;

export const todosApi = {
  list: () => apiRequest<Todo[]>("/api/modules/todos/"),
  get: (id: number) => apiRequest<Todo>(`/api/modules/todos/${id}`),
  create: (data: TodoCreate) =>
    apiRequest<Todo>("/api/modules/todos/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: TodoUpdate) =>
    apiRequest<Todo>(`/api/modules/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiRequest<{ ok: boolean }>(`/api/modules/todos/${id}`, {
      method: "DELETE",
    }),
};
