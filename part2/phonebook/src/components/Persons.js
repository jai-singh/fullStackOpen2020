import React from 'react'

const Persons = ({directory, removePerson}) => {
    return(
    <div>
      {
      directory.map(person => 
      <div key={person.name}>{person.name} {person.number} 
        <button value={person.name} onClick ={removePerson}>delete</button>
      </div>)
      }
    </div>
    )       
}

export default Persons