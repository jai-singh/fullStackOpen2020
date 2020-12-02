const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (famousBlog, blog) => {
    if (famousBlog.likes < blog.likes) {
      famousBlog = blog
    }
    return famousBlog
  }

  const favBlog = blogs.reduce(reducer, blogs[0])

  return favBlog
    ? {
      title: favBlog.title,
      author: favBlog.author,
      likes: favBlog.likes,
    }
    : {}
}

const mostBlogs = (blogs) => {
  const authors = new Map()
  const mostBlog = {
    author: '',
    blogs: 0,
  }

  blogs.forEach((blog) => {
    if (authors.has(blog.author)) {
      authors.get(blog.author).blogs += 1
    } else {
      authors.set(blog.author, { blogs: 1 })
    }

    if (mostBlog.blogs < authors.get(blog.author).blogs) {
      mostBlog.author = blog.author
      mostBlog.blogs = authors.get(blog.author).blogs
    }
  })

  return mostBlog.author === '' ? {} : mostBlog
}

const mostLikes = (blogs) => {
  const authors = new Map()
  const mostLiked = {
    author: '',
    likes: 0,
  }

  blogs.forEach((blog) => {
    if (authors.has(blog.author)) {
      authors.get(blog.author).likes += blog.likes
    } else {
      authors.set(blog.author, { likes: blog.likes })
    }

    if (mostLiked.likes < authors.get(blog.author).likes || mostLiked.author==='') {
      mostLiked.author = blog.author
      mostLiked.likes = authors.get(blog.author).likes
    }
  })

  return mostLiked.author === '' ? {} : mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
