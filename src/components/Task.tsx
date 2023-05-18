import fileIcon from '../assets/file-text.svg';
import dotsIcon from '../assets/vertical-dots.svg';
import Options from './Options';
import { TaskType } from '../models/types.ts';

const Task = ({ task }: { task: TaskType }) => {
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
      {!true && <Options />}
      <button className="task-icon-img_dots">
        <img src={dotsIcon} alt="more option icon" />
      </button>
    </div>
  );
};

export default Task;
