import { TaskType, TasksState } from '../models/types';
import { toggleShowEditor } from '../store';
import Task from './Task';
import { useSelector, useDispatch } from 'react-redux';

const AllTask = () => {
  const tasks: TaskType[] = useSelector((state: TasksState) => state.items);
  const showEditor = useSelector((state: TasksState) => state.showEditor);
  const dispatch = useDispatch();

  return (
    <section className="all-tasks">
      <div className="all-tasks-header">
        <h2>All tasks</h2>
        {!showEditor && (
          <button onClick={() => dispatch(toggleShowEditor())}>
            Add a task +
          </button>
        )}
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </section>
  );
};

export default AllTask;
