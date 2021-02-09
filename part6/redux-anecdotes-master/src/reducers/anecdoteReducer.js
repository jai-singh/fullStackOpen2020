import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: Number(anecdoteToChange.votes)+1 
      }
      return state.map(anecdote => 
          anecdote.id !== id ? anecdote : changedAnecdote
      )

    case 'ADD_NEW':
      return state.concat(action.data)
    
    case 'INIT':
      return action.data

    default: 
        return state
  }

}

export const incrementVote = (anecdote) => {
  return async dispatch => {
    anecdote = {...anecdote, votes:Number(anecdote.votes)+1}
    await anecdoteService.update({newObject: anecdote,id: anecdote.id})
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })    
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data: anecdote
    })
  }
}

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch ({
      type: 'INIT',
      data: anecdote
    })
  }
}

export default anecdoteReducer