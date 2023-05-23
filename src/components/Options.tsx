import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  toggleCompleteTask,
  toggleSelectTask,
  showEditor,
  AppDispatch,
  editTaskDB,
  deleteTaskDB,
} from '../store';
import { TaskType } from '../models/types';

const Options = ({
  onShowOptionHandler,
  task,
}: {
  onShowOptionHandler: (show: boolean) => void;
  task: TaskType;
}) => {
  const dispatchThunk = useDispatch<AppDispatch>();
  const [showSure, setShowSure] = useState<boolean>(false);

  const completeHandler = (complete: boolean) => {
    dispatchThunk(editTaskDB({ ...task, completed: complete }));
    dispatchThunk(toggleCompleteTask(task.id));

    onShowOptionHandler(false);
  };

  const editHandler = () => {
    dispatchThunk(toggleSelectTask(task.id));
    dispatchThunk(showEditor());
    onShowOptionHandler(false);
  };

  return (
    <>
      <div className="backdrop" onClick={() => onShowOptionHandler(false)} />
      <ul className="task-icon-opt">
        <li>
          <button
            className={task.completed ? 'line-through' : ''}
            onClick={() =>
              task.completed ? completeHandler(false) : completeHandler(true)
            }
          >
            Complete
          </button>
        </li>
        {!task.completed && (
          <li>
            <button onClick={editHandler}>Edit</button>
          </li>
        )}
        <li>
          {!showSure ? (
            <button onClick={() => setShowSure(true)}>Delete</button>
          ) : (
            <button onClick={() => dispatchThunk(deleteTaskDB(task.id))}>
              Confirm?
            </button>
          )}
        </li>
      </ul>
    </>
  );
};

export default Options;
