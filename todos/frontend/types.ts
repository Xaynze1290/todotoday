export interface Todo {
  id: number;
  title: string;
  description?: string;
  is_complete: boolean;
  priority: number;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export type TodoCreate = Omit<Todo, "id" | "created_at" | "updated_at">;
export type TodoUpdate = Partial<TodoCreate>;