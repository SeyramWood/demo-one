import React from "react";

const Search = ({ searchKey, handleSearch }) => {
  return (
    <div className="form">
      <input
        type="search"
        value={searchKey}
        onChange={handleSearch}
        placeholder="Search tasks..."
      />
    </div>
  );
};

export default Search;
