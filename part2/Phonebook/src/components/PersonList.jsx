import React from "react";
import PersonCard from "./PersonCard";

const PersonList = ({ persons }) => {
  return (
    <>
      {persons.map((person) => (
        <PersonCard person={person} key={person.name} />
      ))}
    </>
  );
};

export default PersonList;
