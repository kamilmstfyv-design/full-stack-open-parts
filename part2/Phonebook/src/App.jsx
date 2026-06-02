import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonList from "./components/PersonList";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchedPerson, setSearchedPerson] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const matchedName = persons.some((person) => person.name === newName);
    if (matchedName) {
      alert(`${newName} is already added to phonebook`);
      return;
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };
  const filteredPerson = persons.filter((person) =>
    person.name
      .toLocaleLowerCase()
      .includes(searchedPerson.toLocaleLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchedPerson={searchedPerson}
        setSearchedPerson={setSearchedPerson}
      />
      <p>
        <strong>add a new</strong>
      </p>
      <Form
        formSubmit={formSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <PersonList persons={filteredPerson} />
    </div>
  );
};

export default App;
