export interface ITodo {
  id: string;
  title: string;
  description?: string;
  category?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
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

// Alternative interface for compatibility with TodoList component
export interface Todo extends ITodo {
  _id: string;
}