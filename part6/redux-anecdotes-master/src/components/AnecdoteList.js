import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
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