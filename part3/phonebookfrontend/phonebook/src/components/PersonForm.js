import React from 'react'

const PersonForm = (props) => {
     return(
    <form>
            <h3>Add a new</h3>
            <div>
            name: <input value={props.newName} onChange={props.handleNewName}/>
            </div>
            <div>
            number: <input value={props.newNumber} onChange={props.handleNewNumber}/>
            </div>
            <div>
            <button type="submit" onClick={props.addPerson}>add</button>
            </div>
    </form>
    )
}

export default PersonForm