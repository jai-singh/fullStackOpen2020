import React from 'react'
import DisplayWeather from './DisplayWeather'

const DisplayIndivitual = ({ country }) => {  
  if(country.length!==0){
    return(
      <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>Spoken languages</h3>
        <ul>
          {
          country.languages.map((language) => {
          return(<li key={language.name}>{language.name}</li>)
          })
          }
        </ul><br/>
        <img src={country.flag} alt="Country Flag" width="10%" height="10%"/>
        <h3>Weather in {country.capital}</h3>
        <DisplayWeather country={country}/>
      </div>
    )
  }else{
    return(<></>)
  }
}

export default DisplayIndivitual 
