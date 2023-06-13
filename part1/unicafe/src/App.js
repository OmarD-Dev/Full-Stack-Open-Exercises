import { useState } from "react";
const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine
          text="All"
          value={props.bad + props.good + props.neutral}
        />
        <StatisticLine
          text="Average"
          value={
            (props.good - props.bad) / (props.good + props.bad + props.neutral)
          }
        />
        <StatisticLine
          text="Positive"
          value={
            (props.good / (props.good + props.bad + props.neutral)) * 100 + "%"
          }
        />
      </tbody>
    </table>
  );
};
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};
const Title = (props) => <h1>{props.text}</h1>;
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };
  const average = (good - bad) / (good + bad + neutral);
  const positive = (good / (good + bad + neutral)) * 100 + "%";

  return (
    <div>
      <Title text="Give Feedback" />
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Title text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};
export default App;
