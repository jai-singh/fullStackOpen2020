import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchResult, setSearchResult] = useState([])
  const [ searchQuery, setSearchQuery] = useState('')

  const addPerosn = (event) =>{
    event.preventDefault();
    
    let found = persons.findIndex((person) => (person.name===newName))
    
    if(found !== -1){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    
    const personObject = {
        name: newName,
        number: newNumber
    }

    if(personObject.name!==''){
      setPersons(persons.concat(personObject))
    }
    
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const performSearch = (event) => {
    let query = event.target.value 
    setSearchQuery(query)
    if(query.length!==0){
    const list = persons.reduce((personFound,person) => {
      if(person.name.toLowerCase().search(query.toLowerCase()) !==-1 ){
        return personFound.concat(person)
      }else{
        return personFound
      }
      },[]
      )
      setSearchResult(list)
    }else{
      setSearchResult([])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} performSearch={performSearch}/>
      <PersonForm newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}
        addPerosn={addPerosn}/>
      <h3>Numbers</h3>      
      <Persons directory = {searchResult}/>     
    </div>
  )
}

export default App