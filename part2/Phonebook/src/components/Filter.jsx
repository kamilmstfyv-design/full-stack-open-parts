import React from "react";

const Filter = ({ searchedPerson, setSearchedPerson }) => {
  return (
    <div>
      filter shown with:{" "}
      <input
        value={searchedPerson}
        onChange={(e) => setSearchedPerson(e.target.value)}
      />
    </div>
  );
};

export default Filter;
