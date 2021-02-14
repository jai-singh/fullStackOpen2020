import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {   
  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addNewAnecdote(anecdote)
    const message = `Added ${anecdote}`
    props.setMessage(message, 5)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>       
        <div><input name='anecdote' /> </div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addNewAnecdote, setMessage
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedForm