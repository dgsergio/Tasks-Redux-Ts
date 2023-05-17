import AllTask from './AllTask';
import FindTask from './FindTask';
import Header from './Header';
import ManageTasks from './ManageTasks';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <FindTask />
        <ManageTasks />
        <AllTask />
      </main>
    </>
  );
};

export default App;
