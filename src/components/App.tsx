import { useSelector, useDispatch } from 'react-redux';
import { TasksState, TaskType } from '../models/types';
import Tasks from './Tasks';
import SearchTasks from './SearchTasks';
import Header from './Header';
import EditorTask from './EditorTask';
import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { populateTasks } from '../store';

const App = () => {
  const isShown: boolean = useSelector((state: TasksState) => state.isShown);
  const { sendRequest, reqStatus } = useFetch();
  const dispatch = useDispatch();

  const transformData = (data: any): void => {
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
    dispatch(populateTasks(newData));
  };

  useEffect(() => {
    console.log('ef');
    sendRequest(
      { url: import.meta.env.VITE_FIREBASE_URL + 'tasks.json' },
      transformData
    );
  }, []);

  return (
    <>
      <Header />
      {reqStatus.loading && <div className="message">Loading...</div>}
      {reqStatus.error && (
        <div className="message error">{reqStatus.error}</div>
      )}
      {!reqStatus.loading && !reqStatus.error && (
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
