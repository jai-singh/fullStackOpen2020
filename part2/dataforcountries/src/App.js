import React,{ useState, useEffect } from 'react'
import axios from 'axios' 
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [countryName, setCountryName] = useState('')
  const [listCountries, setListCountries] = useState([])
  const [searchResult, setSearchResult] = useState([]) 
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setListCountries(response.data)
      })
  },[])

  const findCountry = (event) => {
    let query = event.target.value
    setCountryName(query)
    const result = listCountries
                    .reduce((found,country)=>{
                      let name = country.name.toLowerCase()
                      if(name.search(query.toLowerCase())!==-1){
                        return found.concat(country)
                      }else{
                        return found
                      }
                    },[])
    setSearchResult(result)    
  }

  return (
  <div>
    find countries <input value={countryName} onChange={findCountry}/>
    <DisplayCountries countries={searchResult}/>
  </div>  
  )
}

export default App
