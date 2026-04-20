import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "./api";
import type { TodoCreate, TodoUpdate } from "./types";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: todoApi.list,
  });
}

export function useTodo(id: number) {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => todoApi.get(id),
    enabled: !!id,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TodoUpdate }) =>
      todoApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todos", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-overview"] });
    },
  });
}