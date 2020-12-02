const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const login = async () => {
  const api = supertest(app)
  const userDetails = {
    username:  'notRoot',
    password: 'notsosecret'
  }

  const response = await api
    .post('/api/login')
    .send(userDetails)

  return response.body.token
}


module.exports = {
  blogsInDb, usersInDb, login
}