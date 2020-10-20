/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log(`Connecting to ${url}`)
mongoose.connect(url,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log(`error connecting to MongoDB: ${err.message}`)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique: true, 
    minlength: [3, 'Name should be atleast 3 letters long']
  },
  number: {
    type: String, 
    required: true, 
    minlength: [8, 'Number should be atleast 8 digits long']
  }
}) 

personSchema.plugin(mongooseUniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id =returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }  
})

module.exports = mongoose.model('Person', personSchema)