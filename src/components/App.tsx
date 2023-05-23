import { useSelector, useDispatch } from 'react-redux';
import { StatusFetch, tasksDB, TasksState, TaskType } from '../models/types';
import Tasks from './Tasks';
import SearchTasks from './SearchTasks';
import Header from './Header';
import EditorTask from './EditorTask';
import { useEffect } from 'react';
import { AppDispatch, fetchTasks } from '../store';

const App = () => {
  const isShown: boolean = useSelector((state: TasksState) => state.isShown);
  const fetchStatus: StatusFetch = useSelector(
    (state: TasksState) => state.status
  );
  const dispatch = useDispatch<AppDispatch>();

  const transformData = (data: tasksDB): TaskType[] => {
    let newData: TaskType[] = [];
    for (const key in data) {
      newData.push({
        id: key,
        completed: data[key].completed,
        date: data[key].date,
        description: data[key].description,
        title: data[key].title,
        isSelected: false,
      });
    }
    return newData;
  };

  useEffect(() => {
    console.log('eff');
    dispatch(fetchTasks(transformData));
  }, []);

  return (
    <>
      <Header />
      {fetchStatus.loading && <div className="message">Loading...</div>}
      {fetchStatus.error && (
        <div className="message error">{fetchStatus.error}</div>
      )}
      {!fetchStatus.loading && !fetchStatus.error && (
        <main>
          <SearchTasks />
          {isShown && <EditorTask />}
          <Tasks />
        </main>
      )}
    </>
  );
};

export default App;
