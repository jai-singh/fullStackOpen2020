import React,{ useState } from 'react'
import DisplayIndivitual from './DisplayIndivitual'

const CountryClick = ({ country }) => {
    const [selectedCountry,setSelectedCountry]=useState([]) 
  
    const showInformation = () => {
      setSelectedCountry(country)
    }
  
    return(
    <>
      <button onClick={showInformation}>show</button>
      <DisplayIndivitual country={selectedCountry}/>
    </>
    )
  
}

export default CountryClick
  