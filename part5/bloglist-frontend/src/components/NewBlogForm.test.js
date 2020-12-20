import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

test('right details are given to the props event handler', () => {
  const createNewBlog = jest.fn()

  const component = render(
    <NewBlogForm createNewBlog={createNewBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  const authorValue = 'James MccLain'
  const titleValue = 'Osaka, the Merchant\'s Capital of Early Modern Japan'
  const urlValue = 'https://www.amazon.com/Osaka-Merchants-Capital-Early-Modern/dp/0801436303'

  fireEvent.change(author, {
    target: { value: authorValue }
  })

  fireEvent.change(title, {
    target: { value: titleValue }
  })

  fireEvent.change(url, {
    target: { value: urlValue }
  })

  fireEvent.submit(form)
  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].author).toBe(authorValue)
  expect(createNewBlog.mock.calls[0][0].title).toBe(titleValue)
  expect(createNewBlog.mock.calls[0][0].url).toBe(urlValue)
})