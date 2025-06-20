export type Todo = {
  _id: string;
  title: string;
  description: string;
  category?: string;
  dueDate: string | Date | undefined;
  completed: boolean;
};

export type CreateTodoData = {
  title: string;
  description?: string;
  category?: string;
  dueDate?: Date;
};
