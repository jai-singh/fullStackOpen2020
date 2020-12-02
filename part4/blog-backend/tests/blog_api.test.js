//to run test successufully from this indivitual file only   
//npm test -- blog_api.test.js

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app) 
const helper = require('./test_helper')
const dummyBlogs = require('./dummy_blogs')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

let token = ''

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('notsosecret', 10)
  const user = new User({username: 'notRoot', name: 'Not Root', passwordHash: passwordHash})
  await user.save()

  token = await helper.login()

  const savedUser = await helper.usersInDb()
  
  await Blog.deleteMany({})
  const blogObjects = dummyBlogs.initialBlogs
    .map(blog => {
      const newBlog = { ...blog, user: savedUser[0].id }
      return new Blog(newBlog)
    })
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('when there is initially some blogs saved', ()=> {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(dummyBlogs.initialBlogs.length)
  })

  test('a specific blog url has been returned', async () => {
    const response = await api.get('/api/blogs')

    const urls = response.body.map(blog => blog.url)
    expect(urls).toContain(dummyBlogs.initialBlogs[4].url)
  })

  test('unique property id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})


describe('addition of a new blog to list of blogs', () => {
  test('a new blog is added with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Neuralink and the Brain’s Magical Future',
      author: 'Tim Urban',
      url:
        'https://waitbutwhy.com/2017/04/neuralink.html',
      likes: 100
    }   

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length+1)
  
    const urls = blogsAtEnd.map(blog => blog.url)
    
    expect(urls).toContain(newBlog.url)
  })
  
  test('no argument for likes is provided',async () => {
    const newBlog = {
      title: 'The Big and the Small',
      author: 'Tim Urban',
      url:
        'https://waitbutwhy.com/2020/09/universe.html'
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogAtEnd = await api.get('/api/blogs')
  
    expect(blogAtEnd.body[blogAtEnd.body.length-1].likes).toBe(0)
  })
  
  test('fails when no arguments for title and url are provided', async () => {
    const newBlog = {
      title: 'The Big and the Small'
    }
    
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('fails when no token provided', async () => {
    const newBlog = {
      title: 'The Big and the Small',
      author: 'Tim Urban',
      url:
        'https://waitbutwhy.com/2020/09/universe.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
  }) 
})


describe('deletion of a blog from list of blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogAtEnd = await helper.blogsInDb()

    expect(blogAtEnd).toHaveLength(blogsAtStart.length-1)

    const urls = blogAtEnd.map(blog => blog.url)

    expect(urls).not.toContain(blogToDelete.url)
  })
})

describe('updating likes of a blog from list of blogs', () => {
  test('succeed updating likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {...blogToUpdate, likes: blogToUpdate.likes+1} 

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedBlog)
      .expect(200)

    const blogAtEnd = await helper.blogsInDb()
    
    expect(blogAtEnd[0].likes).toBe(updatedBlog.likes)

  })

  test('fails updating likes when no token provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {...blogToUpdate, likes: blogToUpdate.likes+1} 

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})