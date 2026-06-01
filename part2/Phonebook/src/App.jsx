import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName };
    const matchedName = persons.some((person) => person.name === newName);
    if (matchedName) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
