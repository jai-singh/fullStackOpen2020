import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.message.message)
  const display = notification === '' ? 'none' : ''
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: display
  }

  return (
    <div style={style}>      
      {notification}
    </div>
  )
}

export default Notification