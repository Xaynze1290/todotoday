import { apiRequest } from "@every-dash/module-sdk";
import type { Todo, TodoCreate, TodoUpdate } from "./types";

const BASE_URL = "/api/modules/todos";

export const todoApi = {
  list: () => apiRequest<Todo[]>(`${BASE_URL}/`),
  get: (id: number) => apiRequest<Todo>(`${BASE_URL}/${id}`),
  create: (data: TodoCreate) =>
    apiRequest<Todo>(`${BASE_URL}/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: number, data: TodoUpdate) =>
    apiRequest<Todo>(`${BASE_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiRequest<{ success: boolean }>(`${BASE_URL}/${id}`, {
      method: "DELETE",
    }),
};