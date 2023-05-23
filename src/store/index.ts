import {
  createSlice,
  configureStore,
  PayloadAction,
  Dispatch,
} from '@reduxjs/toolkit';
import { StatusFetch, TaskType, TasksState, tasksDB } from '../models/types';

const initialState: TasksState = {
  items: [],
  isShown: false,
  status: {
    loading: false,
    error: '',
  },
};

const counterSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    showEditor(state) {
      state.isShown = true;
    },
    hideEditor(state) {
      state.isShown = false;
    },
    populateTasks(state, action: PayloadAction<TaskType[]>) {
      state.items = action.payload.reverse();
    },
    updateTask(state, action: PayloadAction<TaskType>) {
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
    toggleCompleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.map((task) =>
        task.id !== action.payload
          ? task
          : { ...task, completed: !task.completed }
      );
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    toggleSelectTask(state, action: PayloadAction<string>) {
      state.items = state.items.map((task: TaskType) =>
        task.id === action.payload
          ? { ...task, isSelected: !task.isSelected }
          : task
      );
    },
    setStatus(state, action: PayloadAction<StatusFetch>) {
      state.status = action.payload;
    },
  },
});

export const getTasks = (transformData: (data: tasksDB) => TaskType[]) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));
      const response = await fetch(
        import.meta.env.VITE_FIREBASE_URL + 'tasks.json'
      );
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      const dataTransformed = transformData(data);
      dispatch(populateTasks(dataTransformed));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Failed: ' + err }));
    }
  };
};

export const addTaskDB = (task: TaskType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));
      const transformedTask = {
        title: task.title,
        description: task.description,
        date: task.date,
        completed: task.completed,
      };
      const response = await fetch(
        import.meta.env.VITE_FIREBASE_URL + 'tasks.json',
        {
          method: 'POST',
          body: JSON.stringify(transformedTask),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      dispatch(updateTask({ ...task, id: data.name }));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Failed: ' + err }));
    }
  };
};

export const editTaskDB = (task: TaskType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));
      const transformedTask = {
        title: task.title,
        description: task.description,
        date: task.date,
        completed: task.completed,
      };
      const response = await fetch(
        import.meta.env.VITE_FIREBASE_URL + 'tasks/' + task.id + '.json',
        {
          method: 'PATCH',
          body: JSON.stringify(transformedTask),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Something went wrong');
      dispatch(updateTask(task));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Failed: ' + err }));
    }
  };
};

export const deleteTaskDB = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setStatus({ loading: true, error: '' }));
      const response = await fetch(
        import.meta.env.VITE_FIREBASE_URL + 'tasks/' + id + '.json',
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error('Something went wrong');
      dispatch(deleteTask(id));
      dispatch(setStatus({ loading: false, error: '' }));
    } catch (err) {
      dispatch(setStatus({ loading: false, error: 'Failed: ' + err }));
    }
  };
};

export const {
  populateTasks,
  setStatus,
  updateTask,
  showEditor,
  hideEditor,
  toggleCompleteTask,
  deleteTask,
  toggleSelectTask,
} = counterSlice.actions;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: counterSlice.reducer,
});
