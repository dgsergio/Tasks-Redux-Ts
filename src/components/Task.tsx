import fileIcon from '../assets/file-text.svg';
import dotsIcon from '../assets/vertical-dots.svg';
import Options from './Options';
import { useState } from 'react';
import { TaskType, TasksState } from '../models/types.ts';
import { useSelector } from 'react-redux';

const Task = ({ task }: { task: TaskType }) => {
  const [showOption, setShowOption] = useState<boolean>(false);
  const isShown = useSelector((state: TasksState) => state.isShown);

  const showOptionHandler = (show: boolean) => {
    setShowOption(show);
  };

  return (
    <div className={`task${task.completed ? ' complete' : ''}`}>
      <div className="task-content">
        <div className="task-icon">
          <img src={fileIcon} alt="task icon list" />
        </div>
        <div className="task-info">
          <h3>{task.title}</h3>
          <p>{task.date}</p>
        </div>
      </div>
      {showOption && (
        <Options
          id={task.id}
          onShowOptionHandler={showOptionHandler}
          completed={task.completed}
        />
      )}
      <button
        disabled={isShown}
        onClick={() => showOptionHandler(true)}
        className="task-icon-img_dots"
      >
        <img src={dotsIcon} alt="more option icon" />
      </button>
    </div>
  );
};

export default Task;
