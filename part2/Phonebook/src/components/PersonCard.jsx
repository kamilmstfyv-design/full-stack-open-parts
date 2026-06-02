import React from "react";

const PersonCard = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

export default PersonCard;
