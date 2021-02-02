import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setMessage,removeMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  let anecdotes = useSelector( state => state.anecdote)
  anecdotes = anecdotes.filter(a => {
    a = a.content.toLowerCase()
    return a.includes(filter)
  })
  const dispatch = useDispatch()
  
  const vote = async (id) => {
    dispatch(incrementVote(id))
    const anecdote = anecdotes.find(a => a.id === id)
    const message = `you voted '${anecdote.content}'`
    dispatch(setMessage(message))
    setTimeout(()=>{
      dispatch(removeMessage())
    },5000)    
  }
  
  const sortAnecdotes = () => {
    anecdotes.sort((a,b) => {
      if(a.votes > b.votes) {
        return -1
      } else if(a.votes < b.votes) {
        return 1
      } else {
        return 0
      }
    })
  }

  return(
    <div>
      {sortAnecdotes()}
      {anecdotes.map(anecdote => 
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList