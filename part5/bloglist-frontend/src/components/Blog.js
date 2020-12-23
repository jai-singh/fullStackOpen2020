import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateLike }) => {
  const [visible, setVisible] = useState(false)
  const [blogVisiblity, setBlogVisiblity] = useState('')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: blogVisiblity
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removeBlog = () => {
    const toRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if(toRemove) {
      blogService.remove({ id: blog.id })
      setBlogVisiblity('none')
    }
  }

  const deleteVisibility = (blog.user[0].username === user.username) ?
    { display: '' } :
    { display: 'none' }

  return(
    <div style={blogStyle} className='blog' blog-title={blog.title} blog-likes={blog.likes}>
      <div>
        {blog.title} {blog.author}
        <div style = {hideWhenVisible}>
          <button onClick={toggleVisibility}>show</button>
        </div>
        <div style = {showWhenVisible} className='extrainfo'>
          <div>
            <div>{blog.url}</div>
            <div className='like-div'>
              {blog.likes} <button type='Submit' onClick={updateLike} >like</button>
            </div>
            <div>{blog.user[0].name}</div>
            <button type='Submit' style={deleteVisibility} onClick={removeBlog}>remove</button>
            <button type='Submit' onClick={toggleVisibility}>hide</button>
          </div>
        </div>
      </div>
    </div>

  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
