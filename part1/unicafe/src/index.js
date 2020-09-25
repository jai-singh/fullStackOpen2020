import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => {
  return(
  <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  if(text==='positive'){
    return(
    <tr>
        <td>{text}</td>
        <td>{value} %</td>
    </tr>)
  }
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const Statistics = (props) => {
  if(props.all===0){
    return(
      <div>No feedback given</div>
    )
  }
  return(
  <table>
    <tbody>
    <Statistic text='good' value={props.good}/>
    <Statistic text='neutral' value={props.neutral}/>
    <Statistic text='bad' value={props.bad}/>
    <Statistic text='all' value={props.all}/>
    <Statistic text='average' value={props.average} />
    <Statistic text='positive' value={props.poistive} /> 
    </tbody>
  </table>
)
}


const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average,setAverage] = useState(0)
  const [poistive, setPositive] = useState(0)

  const calc = (x) => {
    let newGood = good
    let newBad = bad
    let newAll = all+1
    if(x==='g'){
      newGood+=1
    }else if(x==='b'){
      newBad+=1
    }
    let newAverage = (newGood-newBad)/(newAll)
    let newPositive = (newGood)/(newAll)*100
    setAverage(newAverage)
    setPositive(newPositive)
  } 

  const giveGood = () => {
    setGood(good+1) 
    setAll(all+1)
    calc('g')
  } 

  const giveNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
    calc('n')
  }

  const giveBad = () => {
    setBad(bad+1)
    setAll(all+1)
    calc('b')
  }


  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={giveGood} text='good' />
      <Button handleClick={giveNeutral} text='neutral'/>
      <Button handleClick={giveBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} 
        all={all} average={average} poistive={poistive}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

