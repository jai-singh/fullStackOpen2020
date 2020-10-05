import React,{ useState} from 'react'
import axios from 'axios' 

const DisplayWeather = ({country}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
  
    const getURL = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`      
    
    axios
      .get(getURL)
      .then( response =>{
        setWeather(response.data)
      })
  
    if(weather.length!==0){
      return(
        <div>
          <div><strong>temprature: </strong>{weather.current.temperature} Celcius</div>
          <img src={weather.current.weather_icons[0]} alt='Weather Icon'/>
          <div><strong>wind: </strong>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
        </div>
      )
    }
    else{
      return(<></>)
    }
  }

  export default DisplayWeather