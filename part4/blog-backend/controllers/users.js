const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


userRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length<3) {
    response.status(400).json({'error': 'password is too short or no password provided'})
    return
  }
 
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    
  response.json(users)
})

module.exports = userRouter