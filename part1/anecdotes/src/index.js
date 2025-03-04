import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] =  useState(new Array(props.anecdotes.length).fill(0))
  const [value,setValue] = useState(0)
  const [mostVoted,setMostVoted] = useState(0)
  
  const randomInt = x => Math.floor(Math.floor(x)*Math.random())
  
  const randomSelection = () => {
    const x = randomInt(props.anecdotes.length)
    setSelected(x)
    setValue(votes[x])
  } 

  const findFamous = () => {
    let newMostVoted = mostVoted
    for(let i=0;i<votes.length;i++){
      if(votes[i]>votes[newMostVoted]){
        newMostVoted=i
      }
    }
    return(newMostVoted)
  }

  const changeVote = () => {
     const newVotes = votes
     newVotes[selected]+=1
     setVotes(newVotes)
     setValue(newVotes[selected])
     let mV = findFamous()
     setMostVoted(mV)
   } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {value} votes</div>
      <button onClick={changeVote}>vote</button>
      <button onClick={randomSelection}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[mostVoted]}</div>
      <div>has {votes[mostVoted]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)