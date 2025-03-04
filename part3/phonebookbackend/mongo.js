/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if(process.argv.length<3) {
  console.log('Please provide password as argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://fullStack:${password}@cluster0.hgmdu.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.phoneNumber}`)
    })
    mongoose.connection.close()
  })
}else if(process.argv.length === 5){
  const newName = process.argv[3]
  const newNumber = process.argv[4]

  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(result => {
    console.log('Person information saved')
    mongoose.connection.close()
  })
}
