const errorHandler = (error, request, response, next) => {
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TypeError') {
    return response.status(400).json({
      error: 'Bad Request'
    })
  }

  next(error)
} 

module.exports = errorHandler