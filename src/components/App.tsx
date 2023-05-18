import { useSelector } from 'react-redux';
import { TasksState } from '../models/types';
import AllTask from './AllTask';
import FindTask from './FindTask';
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
        <FindTask />
        {showEditor && <EditorTask />}
        <AllTask />
      </main>
    </>
  );
};

export default App;
