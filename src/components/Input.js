import React from "react";

const Input = ({ handleChange, task, handleSubmit, updateData }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChange} />
      <div className="buttons">
        {updateData && <button type="submit">Save</button>}
        {!updateData && <button type="submit">Add Task</button>}
      </div>
    </form>
  );
};

export default Input;
