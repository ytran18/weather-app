import './index.css';
import axios from 'axios';
import { useState} from 'react'
import CountrySelectName from './Country.json'

import { Select } from 'grommet'


function App() {

    const CountryName = CountrySelectName

    const [data, setData] = useState({})
    const [value, setValue] = useState('Vietnam')

    const options = {
        method:'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {q: `${value}`, days: '3'},
        headers: {
            'X-RapidAPI-Key': '5b255c36d0msh22af93bd818e692p12f4abjsnbf2f204c98de',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    }

    axios.request(options).then(function(response)
    {
        setData(response.data)
    }).catch(function(error)
    {
        alert(error)
    })

    let WeatherLocation = data.location
    let WeatherCurrent = data.current
    let WeatherForecast = data.forecast

    //local time
    let localtime
    //country, capital
    let WeatherCountry, WeatherCapital
    //temparature
    let WeatherTemaprature
    // condition (sunny, clouds, ...)
    let WeatherCondition
    //feels like (_c)
    let WeatherFeelsLike
    //humidity
    let WeatherHumidity
    //wind speed
    let WindSpeed
    
    //tomorrow day
    let theNextDay
    //tomorrow day max temp, min temp, condition
    let tomorrowMaxTemp, tomorrowMinTemp, tomorrowCondition
    
    //the day after tomorrow
    let thedayafterDay
    //the day after tomorrow max temp, min temp, condition
    let thedayafterMaxTemp, thedayafterMinTemp, thedayafterCondition

    if( typeof WeatherLocation !== 'undefined' )
    {
        WeatherCountry = WeatherLocation.country
        WeatherCapital = WeatherLocation.name
        localtime = WeatherLocation.localtime
    }

    if( typeof WeatherCurrent !== 'undefined')
    {
        WeatherTemaprature = WeatherCurrent.temp_c
        WeatherCondition = WeatherCurrent.condition.text
        WeatherFeelsLike = WeatherCurrent.feelslike_c
        WeatherHumidity = WeatherCurrent.humidity
        WindSpeed = WeatherCurrent.wind_mph
    }

    
    if( typeof WeatherForecast !==  'undefined')
    {
        //tomorrow
        theNextDay = WeatherForecast.forecastday[1].date
        tomorrowMaxTemp = WeatherForecast.forecastday[1].day.maxtemp_c
        tomorrowMinTemp = WeatherForecast.forecastday[1].day.mintemp_c
        tomorrowCondition = WeatherForecast.forecastday[1].day.condition.text

        //the day after tomorrow
        thedayafterDay = WeatherForecast.forecastday[2].date
        thedayafterMaxTemp = WeatherForecast.forecastday[2].day.maxtemp_c
        thedayafterMinTemp = WeatherForecast.forecastday[2].day.mintemp_c
        thedayafterCondition = WeatherForecast.forecastday[2].day.condition.text
    }

  
  return (
    <div className="app">
      <div className='container'>
        <div className='search'>
            <Select 
                value={value}
                onChange={({ option }) => setValue(option)}
                options= {CountryName}
                placeholder={'Choose Country'}
            />
            <div className='location'>
                <h1>{WeatherCountry}</h1>
                <h2>Local time: {localtime}</h2>
            </div>
        </div>
        <div className='top'>
            <div className='capital'>
                <h1>{WeatherCapital}</h1>
            </div>
            <div className='temperature'>
                {<h1>{WeatherTemaprature}°C</h1>}
            </div>
            <div className='descriptions'>
                {<h1>{WeatherCondition}</h1>}
            </div>
        </div>
        <div className='bottom'>
            <div className='feelLike'>
                {<h1>{WeatherFeelsLike}°C</h1>}
                <h1 className='info'>Feels Like</h1>
            </div>
            <div className='humidity'>
                {<h1>{WeatherHumidity}%</h1>}
                <h1 className='info'>Huminity</h1>
            </div>
            <div className='windspeed'>
                {<h1>{WindSpeed} MPH</h1>}
                <h1 className='info'>Wind speed</h1>
            </div>
        </div>
        <h2>{theNextDay}</h2>
        <div className='future'>
            <div className='feelLike'>
                    {<h1>{tomorrowMaxTemp}°C</h1>}
                    <h1 className='info'>Max temperature</h1>
                </div>
                <div className='humidity'>
                    {<h1>{tomorrowMinTemp}°C</h1>}
                    <h1 className='info'>Min temperature</h1>
                </div>
                <div className='windspeed'>
                    {<h1>{tomorrowCondition}</h1>}
                    <h1 className='info'>Condition</h1>
                </div>
        </div>
        <h2>{thedayafterDay}</h2>
        <div className='future'>
            <div className='feelLike'>
                    {<h1>{thedayafterMaxTemp}°C</h1>}
                    <h1 className='info'>Max temperature</h1>
                </div>
                <div className='humidity'>
                    {<h1>{thedayafterMinTemp}°C</h1>}
                    <h1 className='info'>Min temperature</h1>
                </div>
                <div className='windspeed'>
                    {<h1>{thedayafterCondition}</h1>}
                    <h1 className='info'>Condition</h1>
                </div>
        </div>
      </div>
    </div>
  );
}

export default App;
