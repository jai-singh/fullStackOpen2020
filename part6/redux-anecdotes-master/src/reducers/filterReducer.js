const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET':
      return action.filter
    default :
      return state
  }
}

export const setFilter = filter => {
  filter = filter.toLowerCase()
  return {
    type: 'SET',
    filter
  }
} 

export default filterReducer