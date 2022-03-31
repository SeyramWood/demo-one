import React from "react";

const Filter = ({ handleFilter }) => {
  return (
    <div className="radio">
      <h5>Filter Tasks</h5>
      <label htmlFor="all">
        <input
          type="radio"
          name="status"
          id="all"
          value="all"
          onChange={(e) => handleFilter(e)}
        />
        <span>All</span>
      </label>
      <label htmlFor="completed">
        <input
          type="radio"
          name="status"
          id="completed"
          value="completed"
          onChange={(e) => handleFilter(e)}
        />
        <span>Completed</span>
      </label>
      <label htmlFor="uncompleted">
        <input
          type="radio"
          name="status"
          id="uncompleted"
          value="uncompleted"
          onChange={(e) => handleFilter(e)}
        />
        <span>Uncompleted</span>
      </label>
    </div>
  );
};

export default Filter;
