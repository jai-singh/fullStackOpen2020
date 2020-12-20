import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog Render Tests', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      user: [{
        id: 'uniqueuserid',
        username: 'Bonaparte',
        name: 'Matt Dameon'
      }],
      likes: 2,
      author: 'Tim',
      title: 'Does this make sense',
      url: 'http://localhost'
    }

    const user = {
      id: 'uniqueuserid',
      username: 'Bonaparte',
      name: 'Matt Dameon'
    }

    component = render(
      <Blog blog={blog} user={user} updateLike={mockHandler}/>
    )
  })

  test('renders blog title and author but not url or likes', () => {

    const div = component.container.querySelector('.extrainfo')
    expect(div).toHaveStyle('display: none')

  })

  test('render blog url and likes when button is clicked', () => {
    const button = component.getByText('show')

    fireEvent.click(button)

    const div = component.container.querySelector('.extrainfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking like button twice calls event handler twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

