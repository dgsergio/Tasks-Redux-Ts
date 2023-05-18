import { createSlice, configureStore } from '@reduxjs/toolkit';
import dummyTasks from '../mocks/dummy-tasks';
import { TasksState } from '../models/types';

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
  },
});

export const { toggleShowEditor } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
