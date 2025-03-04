const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const blog = await Blog.findById(id)
  
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(id)    
    response.status(204).end()
  }  
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(id)
  if (blog.user.toString() === decodedToken.id.toString()) {
    
    const updatedProperty = {
      likes: body.likes
    }

    const updatedBlog = await Blog
      .findByIdAndUpdate(id, updatedProperty, {new: true})
  
    response.json(updatedBlog)
  } 
 
})

module.exports = blogsRouter
