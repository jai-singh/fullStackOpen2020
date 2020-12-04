import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])
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
    setTimeout(() =>{
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

  const createNewBlog = async (event) => {
    event.preventDefault()
    const newPost = {
      title: title,
      author: author,
      url: url
    }
    const blog = await blogService.create(newPost)
    if (blog) {
      await setBlogs(blogs.concat(blog))
      displayMessage(false, `a new blog ${newPost.title} by ${newPost.author} added`)
    }    
    setTitle('')
    setAuthor('')
    setUrl('')
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

  const blogForm = () => {
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
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const newBlogForm = () => {    
    return(
      <NewBlogForm title={title} setTitle={setTitle} 
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl} createNewBlog={createNewBlog}
      />
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