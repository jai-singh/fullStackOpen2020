//to run test successufully from this indivitual file only   
//npm test -- list_helper.test.js

const listHelper = require('../utils/list_helper')
const dummyBlogs = require('./dummy_blogs')

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(dummyBlogs.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has more than one blog', () => {
    const result = listHelper.totalLikes(dummyBlogs.initialBlogs)
    expect(result).toBe(36)
  })

  test('when list is empty', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has one blog', () => {
    const favorite = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    const result = listHelper.favoriteBlog(dummyBlogs.listWithOneBlog)
    expect(result).toEqual(favorite)
  })

  test('when list has more than one blog', () => {
    const favorite = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    const result = listHelper.favoriteBlog(dummyBlogs.initialBlogs)
    expect(result).toEqual(favorite)
  })

  test('when list is empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
})

describe('most blog written by an author', () => {
  test('when list has one blog', () => {
    const authorWithMostBlogs = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }
    const result = listHelper.mostBlogs(dummyBlogs.listWithOneBlog)
    expect(result).toEqual(authorWithMostBlogs)
  })
  test('when list has more than one blog', () => {
    const authorWithMostBlogs = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    const result = listHelper.mostBlogs(dummyBlogs.initialBlogs)
    expect(result).toEqual(authorWithMostBlogs)
  })
  test('when list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
})

describe('most liked author', () => {
  test('when list has one blog', () => {
    const authorMostLiked = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    const result = listHelper.mostLikes(dummyBlogs.listWithOneBlog)
    expect(result).toEqual(authorMostLiked)
  })
  test('when list has more than one blog', () => {
    const authorMostLiked = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    const result = listHelper.mostLikes(dummyBlogs.initialBlogs)
    expect(result).toEqual(authorMostLiked)
  })
  test('when list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })
})

