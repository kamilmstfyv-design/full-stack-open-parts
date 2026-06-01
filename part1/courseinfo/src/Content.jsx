import Part from "./Part";

const Content = (props) => {
  console.log({ props });
  return (
    <>
      {props.course.map((item) => (
        <Part name={item.name} exercises={item.exercises} key={item.id} />
      ))}
    </>
  );
};

export default Content;
