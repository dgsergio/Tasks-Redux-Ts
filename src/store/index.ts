import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import dummyTasks from '../mocks/dummy-tasks';
import { TaskType, TasksState } from '../models/types';

const initialState: TasksState = {
  items: dummyTasks.map((item) => ({ ...item, isSelected: false })),
  isShown: false,
};

const counterSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    showEditor: (state) => {
      state.isShown = true;
    },
    hideEditor: (state) => {
      state.isShown = false;
    },
    //change name
    addTask: (state, action: PayloadAction<TaskType>) => {
      const editedTask = state.items.find(
        (task) => task.id === action.payload.id
      );
      if (editedTask) {
        //The problem should be here
        state.items = state.items.map((task) =>
          task.id === editedTask.id ? editedTask : task
        );
      } else {
        state.items.unshift(action.payload);
      }
      state.isShown = false;
    },
    toggleCompleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((task) =>
        task.id !== action.payload
          ? task
          : { ...task, completed: !task.completed }
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    toggleSelectedTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((task: TaskType) =>
        task.id === action.payload
          ? { ...task, isSelected: !task.isSelected }
          : task
      );
    },
  },
});

export const {
  showEditor,
  hideEditor,
  addTask,
  toggleCompleteTask,
  deleteTask,
  toggleSelectedTask,
} = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
