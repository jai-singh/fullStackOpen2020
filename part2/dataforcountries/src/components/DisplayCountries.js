import React from 'react'
import DisplayIndivitual from './DisplayIndivitual'
import CountryClick from './CountryClick'

const DisplayCountries = (props) => {
    if(props.countries.length===1){
      return(
      <div>
        <DisplayIndivitual country={props.countries[0]}/>
      </div>
      )
  
    }else if(props.countries.length<10){
  
      return(
      <div>
        {
        props.countries.map((country) => 
          <div key={country.name}>{country.name} <CountryClick  country={country}/></div>)
        }
      </div>
      )
    }else{
      return(
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
}

export default DisplayCountries