import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNewAnecdote(anecdote))
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

export default AnecdoteForm