import { useDispatch, useSelector } from 'react-redux';
import {
  hideEditor,
  toggleSelectTask,
  addTaskDB,
  AppDispatch,
  editTaskDB,
} from '../store';
import { TaskType, MonthList, TasksState } from '../models/types';
import { useRef, useState } from 'react';

const EditorTask = () => {
  const dispatchThunk = useDispatch<AppDispatch>();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string>('');
  const tasks = useSelector((state: TasksState) => state.items);
  const taskSelected: TaskType | undefined = tasks.find(
    (task) => task.isSelected === true
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!titleRef.current?.value || !descriptionRef.current?.value) {
      setError('There is an empty field');
      return;
    }
    if (
      titleRef.current.value.length < 3 ||
      titleRef.current.value.length >= 20
    ) {
      setError('The title must have between 3 and 20 characters');
      return;
    }

    //edit
    if (taskSelected) {
      const editedTask: TaskType = {
        ...taskSelected,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        isSelected: false,
      };
      dispatchThunk(editTaskDB(editedTask));
      return;
    }

    //new
    const date = new Date();
    const dateFormated = `${
      MonthList[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
    const newTask: TaskType = {
      id: Date.now().toString(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: dateFormated,
      completed: false,
      isSelected: false,
    };
    dispatchThunk(addTaskDB(newTask));
  };

  const cancelHandler = () => {
    if (taskSelected) {
      dispatchThunk(toggleSelectTask(taskSelected.id));
    }
    dispatchThunk(hideEditor());
  };

  return (
    <section className="editor-task">
      <h2>New Task</h2>
      <form onSubmit={submitHandler} className="editor-task-form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          required
          placeholder="buy a new phone..."
          defaultValue={taskSelected ? taskSelected.title : ''}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          ref={descriptionRef}
          cols={30}
          rows={5}
          required
          placeholder="find a good one for sale..."
          defaultValue={taskSelected ? taskSelected.description : ''}
        ></textarea>
        {error && <p className="message error-editor">{error}</p>}
        <div className="editor-task-footer">
          <button
            type="button"
            onClick={cancelHandler}
            className="editor-task-footer-btn_cancel"
          >
            Cancel
          </button>
          <button type="submit" className="editor-task-footer-btn_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditorTask;
