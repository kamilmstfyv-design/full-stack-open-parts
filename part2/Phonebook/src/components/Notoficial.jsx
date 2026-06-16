const Notoficial = ({ noteficial }) => {
  if (noteficial === null) {
    return null;
  }
  return (
    <div className={noteficial.length > 25 ? "redNote" : "note"}>
      {noteficial}
    </div>
  );
};

export default Notoficial;
