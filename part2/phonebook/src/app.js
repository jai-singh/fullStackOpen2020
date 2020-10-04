import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchResult, setSearchResult] = useState([])
  const [ searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response);
        setPersons(response.data)
      })
  },[])


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