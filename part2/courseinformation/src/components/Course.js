import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
}
  
const Total = ({ course }) => {
    
    const total = course.parts.reduce((sum,courses) => sum=sum+courses.exercises,0)
    
    return(
      <p><strong>total of {total} exercises</strong></p>
    ) 
}
  
const Part = (props) => {
  console.log(props);  
  return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
  )
}
  
const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => <Part part={part}/>) }
      </div>
    )
}

const Course = ({courses}) => {
  console.log(courses)
    return(
        <div>
            <h1>Web development curriculum</h1>
            {courses.map((course) => { 
            console.log(course)
            return(<div key={course.id}>
              <Header course={course}/>
              <Content course={course}/>
              <Total course={course}/>
            </div> ) 
            })}
            
        </div>
    )
}

export default Course