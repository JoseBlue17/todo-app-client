export interface ITodo {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  completed: boolean;
  dueDate?: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITodoData {
  title: string;
  description?: string;
  category?: string;
  dueDate?: Date;
  completed?: boolean;
}

export interface ICreateTodoInput {
  title: string;
  description?: string;
  category?: string;
  dueDate?: Date;
}

export type Todo = ITodo;
