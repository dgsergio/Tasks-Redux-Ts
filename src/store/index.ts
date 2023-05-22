import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { TaskType, TasksState } from '../models/types';

const initialState: TasksState = {
  items: [],
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
    populateTasks: (state, action: PayloadAction<TaskType[]>) => {
      state.items = action.payload;
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      const editedTask = state.items.find(
        (task) => task.id === action.payload.id
      );
      if (editedTask) {
        state.items = state.items.map((task) =>
          task.id === editedTask.id ? action.payload : task
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
    toggleSelectTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((task: TaskType) =>
        task.id === action.payload
          ? { ...task, isSelected: !task.isSelected }
          : task
      );
    },
  },
});

export const {
  populateTasks,
  updateTask,
  showEditor,
  hideEditor,
  toggleCompleteTask,
  deleteTask,
  toggleSelectTask,
} = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
