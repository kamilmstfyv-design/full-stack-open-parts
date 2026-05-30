import React from "react";

const StatisticLine = (props) => {
  return (
    <button onClick={() => props.handleClick(props.text)}>{props.text}</button>
  );
};

export default StatisticLine;
