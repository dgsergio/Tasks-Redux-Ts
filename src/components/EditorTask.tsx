import { useDispatch } from 'react-redux';
import { toggleShowEditor } from '../store';

const EditorTask = () => {
  const dispatch = useDispatch();
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submiting...');
  };

  return (
    <section className="editor-task">
      <h2>New Task</h2>
      <form onSubmit={submitHandler} className="editor-task-form">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="buy a new phone..." />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          cols={30}
          rows={5}
          placeholder="find a good one for sale..."
        ></textarea>
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
