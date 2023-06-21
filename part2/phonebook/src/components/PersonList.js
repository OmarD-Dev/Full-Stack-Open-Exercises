import Person from "./Person";
const PersonList = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.name} person={person} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};
export default PersonList;
