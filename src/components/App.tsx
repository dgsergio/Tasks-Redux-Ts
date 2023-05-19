import { useSelector } from 'react-redux';
import { TasksState } from '../models/types';
import Tasks from './Tasks';
import SearchTasks from './SearchTasks';
import Header from './Header';
import EditorTask from './EditorTask';

const App = () => {
  const showEditor: boolean = useSelector(
    (state: TasksState) => state.showEditor
  );

  return (
    <>
      <Header />
      <main>
        <SearchTasks />
        {showEditor && <EditorTask />}
        <Tasks />
      </main>
    </>
  );
};

export default App;
