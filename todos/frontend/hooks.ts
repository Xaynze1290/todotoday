import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todosApi, type TodoCreate, type TodoUpdate } from "./api";

export const queryKeys = {
  todos: ["modules", "todos"] as const,
  todoList: () => [...queryKeys.todos, "list"] as const,
  todoDetail: (id: number) => [...queryKeys.todos, "detail", id] as const,
};

export function useTodos() {
  return useQuery({
    queryKey: queryKeys.todoList(),
    queryFn: todosApi.list,
  });
}

export function useTodo(id: number) {
  return useQuery({
    queryKey: queryKeys.todoDetail(id),
    queryFn: () => todosApi.get(id),
    enabled: !!id,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoCreate) => todosApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todoList() });
      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TodoUpdate }) =>
      todosApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todoList() });
      queryClient.invalidateQueries({ queryKey: queryKeys.todoDetail(variables.id) });
      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => todosApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todoList() });
      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });
    },
  });
}
