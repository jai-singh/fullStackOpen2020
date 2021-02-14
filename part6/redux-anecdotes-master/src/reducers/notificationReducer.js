const defaultState = {
  message: '',
  timeOutId: null
}

const messageReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      if(state.timeOutId) {
        clearTimeout(state.timeOutId)
      }
      return {
        message: action.message,
        timeOutId: null
      }
    case 'REMOVE_MESSAGE':
      return {
        message: '',
        timeOutId: null
      }
    case 'SET_TIMEOUT':
      return {
        message: state.message,
        timeOutId: action.timeOutId
      }
    default:
      return state
  }
}

export const setMessage = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message: message
    })
    
    const timeOutId = await setTimeout(() => {
        dispatch({
          type: 'REMOVE_MESSAGE'
        })
      },time*1000)

    dispatch({
      type: 'SET_TIMEOUT',
      timeOutId: timeOutId
    })     
  }
} 

export default messageReducer