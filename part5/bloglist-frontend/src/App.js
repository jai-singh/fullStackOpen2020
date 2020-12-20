import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayMessage = (isError, message) => {
    setIsError(isError)
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      displayMessage(true, 'wrong username or password')
      setUsername('')
      setPassword('')
    }

  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const createNewBlog = async (newPost) => {

    const blog = await blogService.create(newPost)

    const id = blog.user[0]
    blog.user[0] = {
      id: id,
      name: user.name,
      username: user.username
    }

    if (blog) {
      await setBlogs(blogs.concat(blog))
      displayMessage(false, `a new blog ${newPost.title} by ${newPost.author} added`)
    }

    blogFormRef.current.toggleVisibility()
  }

  const loginForm = () => {
    return(
      <form onSubmit = {handleLogin}>
        <h2>log in to application</h2>
        <Notification message={message} isError={isError} />
        <div>
          <div>username</div>
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <div>password</div>
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br/> <button type='Submit'>login</button>
      </form>
    )
  }

  const sortBlogs = () => {
    blogs.sort((a,b) => {
      if(a.likes > b.likes) {
        return 1
      } else if (a.likes < b.likes) {
        return -1
      }
      return 0
    })
  }

  const updateLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if(blog.user[0].username !== user.username) {
      displayMessage(true, 'cannot update details about blog if you have not created it')
      return
    }
    const updatedBlog = { ...blog, likes: blog.likes+1 }
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))

    blogService.update({ newObject: updatedBlog, id: blog.id })
  }

  const blogForm = () => {
    sortBlogs()
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} isError={isError} />
        <p>
          {user.name} logged-in
          <button type='Submit' onClick={handleLogout}>logout</button>
        </p>
        {newBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            user={user}
            updateLike={() => updateLike(blog.id)}
          />
        )}
      </div>
    )
  }

  const blogFormRef = useRef()

  const newBlogForm = () => {
    return(
      <Togglable showButtonLabel='create new blog' ref={blogFormRef}>
        <NewBlogForm createNewBlog={createNewBlog}
        />
      </Togglable>
    )
  }

  return (
    <div>
      {
        user === null ?
          loginForm() : blogForm()
      }
    </div>
  )
}

export default App