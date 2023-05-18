import searchIcon from '../assets/search.svg';
import { TasksState, TaskType } from '../models/types';
import Card from './Card';
import delIcon from '../assets/close-x.svg';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const FindTask = () => {
  const tasks: TaskType[] = useSelector((state: TasksState) => state.items);
  const [query, setQuery] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value.toLocaleLowerCase();
    setQuery(q);
    let newTasks: TaskType[] = [];
    if (q) {
      newTasks = tasks.filter(
        (task) =>
          task.title.toLocaleLowerCase().includes(q) ||
          task.description.toLocaleLowerCase().includes(q)
      );
    }
    setFilteredTasks(newTasks);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setQuery('');
    setFilteredTasks(undefined);
  };

  return (
    <section>
      <form className="search-field" onSubmit={submitHandler}>
        <input
          onChange={changeHandler}
          type="text"
          placeholder="Search for a task"
          value={query}
        />

        <button className="input-icon" type="submit">
          <img src={!query ? searchIcon : delIcon} alt="search icon" />
        </button>
      </form>
      <div className="cards">
        {filteredTasks?.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default FindTask;
