import React from "react";
import PersonCard from "./PersonCard";

const PersonList = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <PersonCard
          person={person}
          key={person.name}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};

export default PersonList;
