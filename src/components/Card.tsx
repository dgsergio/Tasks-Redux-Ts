import fileSearch from '../assets/file-search.svg';
import { TaskType } from '../models/types';

const Card = ({ task }: { task: TaskType }) => {
  let descShort: string = task.description;
  if (task.description.split(' ').length > 12) {
    descShort = task.description.split(' ', 12).join(' ') + '...';
  }

  return (
    <div className={`card ${task.completed ? 'complete' : ''}`}>
      <div className="card-header">
        <div className="card-icon">
          <img src={fileSearch} alt="task search icon" />
        </div>
        <h3>{task.title}</h3>
      </div>
      <p className="card-p_description">{descShort}</p>
      <p>{task.date}</p>
    </div>
  );
};

export default Card;
