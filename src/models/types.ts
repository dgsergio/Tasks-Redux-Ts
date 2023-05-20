export type TaskType = {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  isSelected: boolean;
};

export type TasksState = {
  items: TaskType[];
  isShown: boolean;
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
