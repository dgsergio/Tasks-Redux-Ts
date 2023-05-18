export type TaskType = {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
};

export type TasksState = {
  items: TaskType[];
  showEditor: boolean;
};
