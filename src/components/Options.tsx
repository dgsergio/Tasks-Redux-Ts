import { useDispatch } from 'react-redux';
import {
  deleteTask,
  toggleCompleteTask,
  toggleSelectedTask,
  showEditor,
} from '../store';

const Options = ({
  onShowOptionHandler,
  id,
  completed,
}: {
  onShowOptionHandler: (show: boolean) => void;
  id: string;
  completed: boolean;
}) => {
  const dispatch = useDispatch();
  const completeHandler = () => {
    dispatch(toggleCompleteTask(id));
    onShowOptionHandler(false);
  };

  const deleteHandler = () => {
    dispatch(deleteTask(id));
  };

  const editHandler = () => {
    dispatch(toggleSelectedTask(id));
    dispatch(showEditor());
  };

  return (
    <>
      <div className="backdrop" onClick={() => onShowOptionHandler(false)} />
      <ul className="task-icon-opt">
        <li>
          <button
            className={completed ? 'line-through' : ''}
            onClick={completeHandler}
          >
            Complete
          </button>
        </li>
        {!completed && (
          <li>
            <button onClick={editHandler}>Edit</button>
          </li>
        )}
        <li>
          <button onClick={deleteHandler}>Delete</button>
        </li>
      </ul>
    </>
  );
};

export default Options;
