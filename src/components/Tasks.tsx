import { TaskType, TasksState } from '../models/types';
import { showEditor } from '../store';
import Task from './Task';
import { useSelector, useDispatch } from 'react-redux';

const Tasks = () => {
  const tasks: TaskType[] = useSelector((state: TasksState) => state.items);
  const isShown = useSelector((state: TasksState) => state.isShown);
  const dispatch = useDispatch();

  return (
    <section className="all-tasks">
      <div className="all-tasks-header">
        <h2>All tasks</h2>
        {!isShown && (
          <button onClick={() => dispatch(showEditor())}>Add a task +</button>
        )}
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </section>
  );
};

export default Tasks;
