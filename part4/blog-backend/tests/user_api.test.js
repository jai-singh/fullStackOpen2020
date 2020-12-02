//to run test successufully from this indivitual file only  
//npm test -- user_api.test.js

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('notsosecret', 10)
  const user = new User({username: 'notRoot', name: 'Not Root', passwordHash: passwordHash})
  await user.save()
})

describe('when there is initially one user in db', () => {
  test('testing the data returned is same as stored', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtStart = await helper.usersInDb()

    expect(response.body).toEqual(usersAtStart)
  })
})

describe('adding a new user data', () => {
  test('succeeds with correct data', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'stalin',
      name: 'Joseph',
      password: 'gulag'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(usersAtStart.length+1)

    const usernames = userAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails when no username provided', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Trump',
      password: 'iamthebestpresident'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')
    
    const userAtEnd = await helper.usersInDb()

    expect(usersAtStart).toHaveLength(userAtEnd.length)
  })

  test('fails when no password provided', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Trump',
      username: 'Donald'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('no password provided')
    
    const userAtEnd = await helper.usersInDb()

    expect(usersAtStart).toHaveLength(userAtEnd.length)
  })

  test('fails when username is shorter then 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Trump',
      username: 'Do',
      password: 'simpson'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')
    
    const userAtEnd = await helper.usersInDb()

    expect(usersAtStart).toHaveLength(userAtEnd.length)
  })

  test('fails when password is shorter then 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Trump',
      username: 'Donald',
      password: 'si'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('password is too short')
    
    const userAtEnd = await helper.usersInDb()

    expect(usersAtStart).toHaveLength(userAtEnd.length)
  })

  test('fails when username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'notRoot',
      name: 'Not Root',
      password: 'notsosecret'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('`username` to be unique')
    
    const userAtEnd = await helper.usersInDb()

    expect(usersAtStart).toHaveLength(userAtEnd.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})