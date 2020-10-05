import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchResult, setSearchResult] = useState([])
  const [ searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then( data => setPersons(data))
  },[])

  const addPersonToList = (update=false,id=-1) => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(personObject.name!==''){
      if(!update){
        phonebookService
          .create(personObject)
          .then(data => setPersons(persons.concat(data)))
      }else{
        phonebookService
          .update(id,personObject)
          .then(data => {
            const newList = persons.map( person => person.id!==id ? person : data)
            setPersons(newList)            
          })
      }      
    }
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) =>{
    event.preventDefault();    
    const foundIndex = persons.findIndex((person) => (person.name.toLowerCase()===newName.toLowerCase()))    
    if(foundIndex !== -1){
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(result){
        addPersonToList(true,persons[foundIndex].id)
        return
      }
    } 
    addPersonToList()           
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const changeSearchResult =  (query,personList=persons) => {
    const list = personList.reduce((personFound,person) => {
      if(person.name.toLowerCase().search(query.toLowerCase()) !==-1 ){
        return personFound.concat(person)
      }else{
        return personFound
      }
      },[]
      )
      setSearchResult(list)
   }

  const performSearch = (event) => {
    const query = event.target.value 
    setSearchQuery(query)
    if(query.length!==0){
      changeSearchResult(query)
    }else{
      setSearchResult([])
    }
  }

  const removePerson = (event) => {
    const personName = event.target.value
    const result = window.confirm(`Delete ${personName} ?`)
    if(result){
      const found = persons.find((person) => (person.name===personName))
      const id = found.id
      phonebookService
        .remove(id)
        .then(() => {
          const personsList = persons.filter(person => person.id !== id)
          setPersons(personsList)
          changeSearchResult(searchQuery,personsList)
        }
        )
    }
    
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} performSearch={performSearch}/>
      <PersonForm newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}
        addPerson={addPerson}/>
      <h3>Numbers</h3>      
      <Persons directory={searchResult} removePerson={removePerson}/>     
    </div>
  )
}

export default App