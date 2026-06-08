const Notoficial = ({ noteficial }) => {
  if (noteficial === null) {
    return null;
  }
  return <div className="note">{noteficial}</div>;
};

export default Notoficial;
