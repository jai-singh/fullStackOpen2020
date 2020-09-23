import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => {
  return(
  <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({text, score}) => {
  return(
  <p>{text} {score}</p>
  )
}

const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGood = () => setGood(good+1)
  const giveNeutral = () => setNeutral(neutral+1)
  const giveBad = () => setBad(bad+1)

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={giveGood} text='good' />
      <Button handleClick={giveNeutral} text='neutral'/>
      <Button handleClick={giveBad} text='bad'/>
      <h1>statistics</h1>
      <Display text='good' score={good}/>
      <Display text='neutral' score={neutral}/>
      <Display text='bad' score={bad}/>
    </div>
  )
}






ReactDOM.render(<App />, document.getElementById('root'));

