import { useState, useEffect } from "react";
import personService from "./services/persons";
import PersonList from "./components/PersonList";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterTerm, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPerson) => {
      console.log("promise fulfilled");
      setPersons(initialPerson);
    });
  }, []);
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one? `
        )
      ) {
        personService
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage({ text: `Updated ${newName}`, type: "success" });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
            setMessage({
              text: `Information of ${newName} has already been deleted`,
              type: "error",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            console.log(error);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage({ text: `Added ${newName}`, type: "success" });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            text: ` ${error.response.data.error}`,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          console.log(error.response.data.error);
        });
    }
  };
  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({ text: `Deleted ${name}`, type: "success" });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({
            text: `Information of ${name} was already deleted from server`,
            type: "error",
          });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          console.log(error);
        });
    }
  };
  const handlePerson = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message && message.text}
        type={message && message.type}
      />
      <Filter filterTerm={filterTerm} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handlePerson={handlePerson}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} handleDelete={removePerson} />
    </div>
  );
};

export default App;
