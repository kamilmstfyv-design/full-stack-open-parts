import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonList from "./components/PersonList";
import {
  getData,
  addData,
  deletePerson,
  replaceNumber,
} from "./services/information";
import Notoficial from "./components/Notoficial";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchedPerson, setSearchedPerson] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notMessage, setNotmessage] = useState(null);

  useEffect(() => {
    getData().then((data) => {
      setPersons(data);
    });
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const matchedName = persons.some((person) => person.name === newName);
    if (matchedName) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one`,
        )
      ) {
        const findedPerson = persons.find((person) => person.name === newName);
        replaceNumber(findedPerson.id, {
          ...findedPerson,
          number: newNumber,
        })
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id === data.id ? data : person)),
            );

            setNotmessage(` ${data.name}'s number changed`);
            setTimeout(() => {
              setNotmessage(null);
            }, 2500);
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            setNotmessage(
              `Information of ${newName} has already been removed from server`,
            );
            setTimeout(() => {
              setNotmessage(null);
            }, 2500);
            setPersons(persons.filter((p) => p.name !== newName));
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    } else {
      addData(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNotmessage(`Added ${data.name}`);
        setTimeout(() => {
          setNotmessage(null);
        }, 2500);
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const filteredPerson = persons.filter((person) =>
    person.name
      .toLocaleLowerCase()
      .includes(searchedPerson.toLocaleLowerCase()),
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNewName("");
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notoficial noteficial={notMessage} />
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
      <PersonList persons={filteredPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
