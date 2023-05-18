import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import dummyTasks from '../mocks/dummy-tasks';
import { TaskType, TasksState } from '../models/types';

const initialState: TasksState = {
  items: dummyTasks,
  showEditor: false,
};

const counterSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleShowEditor: (state) => {
      state.showEditor = !state.showEditor;
    },
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.items.unshift(action.payload);
      state.showEditor = false;
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
  },
});

export const { toggleShowEditor, addTask, toggleCompleteTask, deleteTask } =
  counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
