import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  console.log(course);
  return (
    <>
      <Header course={course} />
      <Content course={course.parts} />
      <Total course={course} />
    </>
  );
};

export default Course;
