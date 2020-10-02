import React from 'react'

const Persons = ({directory}) => {
    return(
    <div>
      {
      directory.map(person => 
      <div key={person.name}>{person.name} {person.number}
      </div>)
      }
    </div>
    )       
}

export default Persons