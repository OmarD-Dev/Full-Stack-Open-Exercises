import { useState } from "react";
const Votes = ({ value }) => <p>Has {value} votes</p>;
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const MostVotes = ({ allVotes, anecdotes }) => {
  let highestVote = allVotes.indexOf(Math.max(...allVotes));
  let bestAnecdote = anecdotes[highestVote];
  if (allVotes[highestVote] === 0) {
    return <h3>No votes yet</h3>;
  }
  return <h3>{bestAnecdote}</h3>;
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(Array(8).fill(0));

  const anecdoteClick = () => {
    let anecdoteIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(anecdoteIndex);
  };
  const handleVotes = () => {
    const copyVotes = [...allVotes];
    copyVotes[selected] += 1;
    setAllVotes(copyVotes);
  };
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <h3>{anecdotes[selected]}</h3>
      <Votes value={allVotes[selected]} />
      <Button handleClick={handleVotes} text="Vote" />
      <Button handleClick={anecdoteClick} text="Next Anecdote" />
      <h1>Anecdote With Most Votes</h1>
      <MostVotes allVotes={allVotes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
