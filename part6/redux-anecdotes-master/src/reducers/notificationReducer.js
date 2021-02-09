const messageReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'REMOVE_MESSAGE':
      return ''
    default:
      return state
  }
}

export const setMessage = (message, time) => {
  return async dispatch => {
    await setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE'
      })
    },time*1000)
    dispatch({
      type: 'SET_MESSAGE',
      message
    })   
  }
} 

export default messageReducer