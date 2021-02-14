import React from 'react'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  let anecdotes = props.anecdote
  
  const vote = async (anecdote) => {
    props.incrementVote(anecdote)
    const message = `you voted '${anecdote.content}'`
    props.setMessage(message, 5)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if( state.filter === '') {
    return {
      anecdote: state.anecdote,      
    }
  }
  return {
    anecdote: state.anecdote.filter(a => {
      a = a.content.toLowerCase()
      return a.includes(state.filter)
    }),    
  }
}

const mapDispatchToProps = {
  incrementVote, setMessage
}

const ConnectedAnecdote = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdote