import './index.css';
import axios from 'axios';
import { useState, useEffect } from 'react'


function App() {

  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [data, setData] = useState({})

  const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=08dc4ea01a751cf0faeb809872ef1c0b`

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position)
    {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
    })
  
  },[lat,long])
  

  axios.get(url).then((response) => 
  {
    setData(response.data)
  })

  
  return (
    <div className="app">
      <div className='container'>
        <div className='top'>
            <div className='location'>
                <h1>{data.name}</h1>
            </div>
            <div className='temperature'>
                {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className='descriptions'>
                {data.main ? <h1>{data.weather[0].main}</h1> : null}
            </div>
        </div>
        <div className='bottom'>
            <div className='feelLike'>
                {data.main ? <h1>{data.main.feels_like.toFixed()}°F</h1> : null}
                <h1>Feels Like</h1>
            </div>
            <div className='humidity'>
                {data.main ? <h1>{data.main.humidity}%</h1> : null}
                <h1>Huminity</h1>
            </div>
            <div className='windspeed'>
                {data.wind ? <h1>{data.wind.speed.toFixed()} MPH</h1> : null}
                <h1>Wind speed</h1>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
