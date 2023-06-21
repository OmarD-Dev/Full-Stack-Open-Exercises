const Person = ({ person, handleDelete }) => (
  <li>
    {person.name} {person.number}
    <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
  </li>
);

export default Person;
