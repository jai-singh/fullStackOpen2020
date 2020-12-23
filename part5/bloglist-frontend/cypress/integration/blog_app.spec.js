const { _ } = Cypress

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  const user = {
    name: name,
    username: username,
    password: password
  }
  cy.request('POST', 'http://localhost:3001/api/users/', user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST','http://localhost:3001/api/login',{
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createNewBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {
      title: title,
      author: author,
      url: url
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ name:'George Constanza', username: 'georgec', password: 'serenity' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('georgec')
      cy.get('#password').type('serenity')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'log in to application')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('georgec')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'georgec', password: 'serenity' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('The Big and the Small')
      cy.get('#author').type('Tim Urban')
      cy.get('#url').type('https://waitbutwhy.com/2020/09/universe.html')
      cy.get('#create').click()

      cy.contains('The Big and the Small Tim Urban')
    })

    it('a user can like a blog', function() {
      cy.createNewBlog({
        title: 'The Big and the Small',
        author: 'Tim Urban',
        url: 'https://waitbutwhy.com/2020/09/universe.html'
      })

      cy.contains('The Big and the Small Tim Urban')
        .contains('show')
        .click()

      cy.contains('The Big and the Small Tim Urban')
        .contains('like')
        .click()

      cy.contains('The Big and the Small Tim Urban')
        .get('.like-div')
        .contains('1')
    })

    it('a user can delete a blog that it created', function() {
      cy.createNewBlog({
        title: 'The Big and the Small',
        author: 'Tim Urban',
        url: 'https://waitbutwhy.com/2020/09/universe.html'
      })

      cy.contains('The Big and the Small Tim Urban')
        .contains('show')
        .click()

      cy.contains('The Big and the Small Tim Urban')
        .contains('remove')
        .click()

      cy.contains('The Big and the Small Tim Urban').should('not.visible')
    })

    it('other user cannot delete the blog which is not created by them', function() {
      cy.createNewBlog({
        title: 'The Big and the Small',
        author: 'Tim Urban',
        url: 'https://waitbutwhy.com/2020/09/universe.html'
      })

      cy.createUser({
        name:'Jerry Seinfield',
        username: 'jerry',
        password: 'seinfield'
      })

      cy.login({
        username: 'jerry',
        password: 'seinfield'
      })

      cy.contains('The Big and the Small Tim Urban')
        .contains('show')
        .click()

      cy.contains('The Big and the Small Tim Urban')
        .contains('remove')
        .should('not.visible')
    })

    it('blogs are odered according to likes', function() {
      cy.createNewBlog({
        title: 'The Big and the Small',
        author: 'Tim Urban',
        url: 'https://waitbutwhy.com/2020/09/universe.html'
      })

      cy.createNewBlog({
        title: 'Putting Time In Perspective',
        author: 'Tim Urban',
        url: 'https://waitbutwhy.com/2013/08/putting-time-in-perspective.html'
      })

      cy.createNewBlog({
        title: '100 Blocks a Day',
        author: 'Tim Urban',
        url: 'https://waitbutwhy.com/2016/10/100-blocks-day.html'
      })

      cy.contains('The Big and the Small Tim Urban')
        .contains('show')
        .click()

      cy.contains('The Big and the Small Tim Urban')
        .contains('like')
        .click().click().click()

      cy.contains('100 Blocks a Day Tim Urban')
        .contains('show')
        .click()

      cy.contains('100 Blocks a Day Tim Urban')
        .contains('like')
        .click().click().click().click().click()

      cy.contains('Putting Time In Perspective Tim Urban')
        .contains('show')
        .click()

      cy.contains('Putting Time In Perspective Tim Urban')
        .contains('like')
        .click()

      const toBlogObjects = (blogs) => _.map(blogs[0].childNodes, (childNodes) => {
        return {
          title: childNodes.attributes['blog-title'].value,
          likes: Number(childNodes.attributes['blog-likes'].value)
        }
      })

      const blogListedSortedOrNot = (blogs) => {
        if (blogs.length === 0 || blogs.length === 1) {
          return true
        }

        for (let i = 1; i < blogs.length; i++) {
          if (blogs[i-1].likes < blogs[i].likes){
            return false
          }
        }
        return true
      }

      cy.get('#blog-list')
        .then(toBlogObjects)
        .then(blogListedSortedOrNot)
        .then((isSorted) => {
          expect(isSorted).to.be.true
        })

    })
  })
})