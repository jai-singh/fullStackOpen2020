/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./modules/person')

const app = express()
app.use(express.static('build'))
app.use(express.json())


morgan.token('data', (request, response)=> {
  if(request.method==='POST'){
    return(JSON.stringify(request.body))
  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request,response,next) => {
  Person.find({}).then( persons =>
    response.json(persons)
  )
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request,response,next) => {
  const id = request.params.id
  Person
    .findById(id)
    .then(person => response.json(person))
    .catch(error => next(error))  
})

app.post('/api/persons', (request,response,next) => {
  if(request.body.name && request.body.number){
    const person = new Person({
      name: request.body.name,
      number: request.body.number,
    })

    person
      .save()
      .then(result => {
        console.log('Person information saved')
        response.json(result)
      })
      .catch(error => next(error))
    
  }else{
    const error_msg = {'error': 'name or number missing'}
    response.status(400).json(error_msg)
  }
})

app.put('/api/persons/:id', (request,response,next) => {
  const id = request.params.id
  const person = {
    name: request.body.name,
    number: request.body.number
  }

  Person.findByIdAndUpdate(id, person, { runValidators: true, context: 'query', new: true})
    .then(updatedDetail => {
      response.json(updatedDetail)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

app.get('/info', (request,response,next) => {
  Person.count({},(error,result) => {
    if(!error){
      const length=result
      const date = new Date()
      const details = `Phonebook has info for ${length} people`
      response.send(`<div>${details}</div> <br/> <div>${date}</div`)
    }else{
      next(error)
    }
  })
  
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})