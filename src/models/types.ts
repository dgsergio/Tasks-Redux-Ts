export type TaskType = {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  isSelected: boolean;
};

export type StatusFetch = {
  loading: boolean;
  error: string;
};

export type TasksState = {
  items: TaskType[];
  isShown: boolean;
  status: StatusFetch;
};

export type tasksDB = {
  [key: string]: {
    title: string;
    description: string;
    date: string;
    completed: boolean;
  };
};

export enum MonthList {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}
