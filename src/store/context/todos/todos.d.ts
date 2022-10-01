export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type TodosResolvedResponse = Todo[];

export interface TodosRejectedResponse {
  message: string;
}
