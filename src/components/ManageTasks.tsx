const ManageTasks = () => {
  return (
    <section className="manage-task">
      <h2>New Task</h2>
      <form className="manage-task-form">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" />
        <label htmlFor="description">Description</label>
        <textarea id="description" cols={30} rows={5}></textarea>
        <div className="manage-task-footer">
          <button type="button" className="manage-task-footer-btn_cancel">
            Cancel
          </button>
          <button type="submit" className="manage-task-footer-btn_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ManageTasks;
