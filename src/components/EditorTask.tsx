import { useDispatch } from 'react-redux';
import { addTask, toggleShowEditor } from '../store';
import { TaskType, MonthList } from '../models/types';
import { useRef, useState } from 'react';

const EditorTask = () => {
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState<string>('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!titleRef.current?.value || !descriptionRef.current?.value) {
      setError('There is an empty field');
      return;
    }

    const date = new Date();
    const dateFormated = `${
      MonthList[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
    const taskselected: TaskType = {
      id: Date.now().toString(),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: dateFormated,
      completed: false,
    };
    dispatch(addTask(taskselected));
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
          placeholder="buy a new phone..."
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          ref={descriptionRef}
          cols={30}
          rows={5}
          placeholder="find a good one for sale..."
        ></textarea>
        {error && <p className="message error-editor">{error}</p>}
        <div className="editor-task-footer">
          <button
            type="button"
            onClick={() => dispatch(toggleShowEditor())}
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
