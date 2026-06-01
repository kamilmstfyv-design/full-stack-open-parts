const Total = ({ course }) => {
  console.log({ course });
  const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  console.log(sum);
  return <strong>Total of {sum} exercises</strong>;
};

export default Total;
