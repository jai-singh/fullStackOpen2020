import React from 'react'

const NewBlogForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <div>
        title: <input 
          type='text' 
          value={props.title} 
          name='title' 
          onChange={({ target }) => props.setTitle(target.value)}
        />
      </div>
      <div>
        author: <input 
          type='text' 
          value={props.author} 
          name='author' 
          onChange={({ target }) => props.setAuthor(target.value)}
        />
      </div>
      <div>
        url: <input 
          type='text' 
          value={props.url} 
          name='url' 
          onChange={({ target }) => props.setUrl(target.value)}
        />
      </div>
      <button type='submit' onClick={ props.createNewBlog }>create</button>
    </div>
  )
}

export default NewBlogForm