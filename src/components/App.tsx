import { useSelector } from 'react-redux';
import { TasksState } from '../models/types';
import Tasks from './Tasks';
import SearchTasks from './SearchTasks';
import Header from './Header';
import EditorTask from './EditorTask';

const App = () => {
  const isShown: boolean = useSelector((state: TasksState) => state.isShown);

  return (
    <>
      <Header />
      <main>
        <SearchTasks />
        {isShown && <EditorTask />}
        <Tasks />
      </main>
    </>
  );
};

export default App;
