import Part from "./Part";

const Content = (props) => {
  console.log(props);
  return (
    <>
      {props.parts.map((item, index) => (
        <Part name={item.name} exercises={item.exercises} key={index} />
      ))}
    </>
  );
};

export default Content;
