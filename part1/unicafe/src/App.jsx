import React, { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";
import StatisticLine from "./StatisticLine";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;
  const handleClick = (type) => {
    if (type === "good") {
      setGood(good + 1);
    } else if (type === "neutral") {
      setNeutral(neutral + 1);
    } else if (type === "bad") {
      setBad(bad + 1);
    }
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleClick} />
      <Button text="neutral" handleClick={handleClick} />
      <Button text="bad" handleClick={handleClick} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
