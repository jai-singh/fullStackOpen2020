import React from 'react'

const Notification = ({message,isError}) => {
    const typeOfNotification = isError ? 'error' : 'message'
    if(message!==''){
        return(
            <div className={typeOfNotification}>
                {message}
            </div>
        )
    }else{
        return(null)
    } 
}

export default Notification