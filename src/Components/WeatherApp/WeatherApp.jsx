import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from "../Assets/search.png";
import logo from "../Assets/logo.png";
import refresh from "../Assets/refresh.png";
import location from "../Assets/location.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";

const WeatherApp = () => {

    let api_key = "a103f9d9ad5e4e11911ebf86ab39b55a" 
    const [wicon,setWicon] = useState(cloud_icon)  // For better illustration.. The code uses conditional statements
    // to check the weather condition code provided by the API and sets the wicon state accordingly.
    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };

    const formatSunriseTime = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
      };
      
      const formatUnixTimestampToDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
      
        return `${day} ${month} ${year}`;
      };
      //Use of Search function
      // It triggers an asynchronous API call to OpenWeatherMap using the city entered in the input field, 
      //updates the UI with weather information, and dynamically sets the weather icon based on the retrieved data.
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === "")
        {
            return 0
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

        
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)

        const location = document.getElementsByClassName("place")
        const latitude = document.getElementsByClassName("lat")
        const longitude = document.getElementsByClassName("long")
        const high = document.getElementsByClassName("ht")
        const low = document.getElementsByClassName("lt")
        const humid = document.getElementsByClassName("humidity") 
        const sunrise = document.getElementsByClassName("sunrise")
        const sunset = document.getElementsByClassName("sunset") 
        //one
        const date = document.getElementsByClassName("date") 
        const type = document.getElementsByClassName("type")
        

        location[0].innerHTML = data.name +", "+ data.sys.country;
        latitude[0].innerHTML = data.coord.lat + " & ";
        longitude[0].innerHTML = data.coord.lon;
        high[0].innerHTML = data.main.temp_max + "°C / "+ celsiusToFahrenheit(data.main.temp_max) + "°F";
        low[0].innerHTML = data.main.temp_min + "°C / "+ celsiusToFahrenheit(data.main.temp_min) + "°F";
        humid[0].innerHTML = data.main.humidity +"%";
        sunrise[0].innerHTML = formatSunriseTime(data.sys.sunrise);
        sunset[0].innerHTML = formatSunriseTime(data.sys.sunset);
        
        // two
        date[0].innerHTML = formatUnixTimestampToDate(data.dt);
        type[0].innerHTML = data.weather[0].main;
        
        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
          setWicon(clear_icon)
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
          setWicon(cloud_icon)
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
          setWicon(drizzle_icon)
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
          setWicon(drizzle_icon)
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
          setWicon(rain_icon)
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
          setWicon(rain_icon)
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
          setWicon(snow_icon)
        }
        else{
          setWicon(clear_icon)
        }
    
    }


  return (
      <div className='container'>
                <div className="top-nav">
                <div><p className='weather99'><img style={{margin:'0% 2%'}}src={logo} alt='' width="15%"/>Weather 99</p></div>
                
                     
                    <div><p className='refresh'><img style={{margin:'0% 2%'}} src={refresh} alt='' width="10%"/> Refresh</p></div>
                    

                </div>
                <div>   <div className="top-bar">
                    <span className="location">
                        <div>
                        {<img style={{margin:'0% 2%'}}src={location} alt='' width="8%"/>}
                        <span className='place'>City, Country</span>
                        </div>
                        <div>
                            <span className='lat'>xx.xx</span>
                            <span className='long'>yy.yy</span>
                        </div>
                    </span>
                    <div className = "search-back">
                      <input  className="cityInput" type="text"  placeholder="Search your city here..." />
                      <span className="searchIcon" onClick={()=>{search()}} ><img src={search_icon} alt='' width="30px"/></span>
                    </div>
                  
              </div>
              <hr width="80%" /></div>
              <div className='card-container'>
              <div className= "card">
                <div className = "date0">Date</div>
                
                <div className="type0">Cloud</div>
                <div className = "ht0"></div>
                <div className = "ht0"></div>
             
                <div className = "ht0">High Temperature</div>
                <div className = "lt0">Low Temperature</div>
                <div className = "humidity0">Humidity</div>
                <div className = "sunrise0">Sunrise Time</div>
                <div className = "sunset0">Sunset Time</div>
              </div>
              <div className= "card1">
                <div className = "date">20.12.23</div>
                <div><img height="50px" src = {wicon} alt =""/></div>
                <div className="type">Sunny</div>
                <div className = "ht">23^C / 63^F</div>
                <div className = "lt">23^C / 63^F</div>
                <div className = "humidity">76%</div>
                <div className = "sunrise">06:21 AM</div>
                <div className = "sunset">05:93 PM</div>
              </div>
              <div className= "card1">
                <div className = "date">19.12.23</div>
                <div><img height="50px" src = {wicon} alt =""/></div>
                <div className="type">Snowy</div>
                <div className = "ht">23^C / 63^F</div>
                <div className = "lt">23^C / 63^F</div>
                <div className = "humidity">76%</div>
                <div className = "sunrise">06:21 AM</div>
                <div className = "sunset">05:93 PM</div>
              </div>
              <div className= "card1">
                <div className = "date">20.12.23</div>
                <div><img height="50px" src = {wicon} alt =""/></div>
                <div className="type">Rainy</div>
                <div className = "ht">23^C / 63^F</div>
                <div className = "lt">23^C / 63^F</div>
                <div className = "humidity">76%</div>
                <div className = "sunrise">06:21 AM</div>
                <div className = "sunset">05:93 PM</div>
              </div>
              <div className= "card1">
                <div className = "date">20.12.23</div>
                <div><img height="50px" src = {wicon} alt =""/></div>
                <div className="type">Windy</div>
                <div className = "ht">23^C / 63^F</div>
                <div className = "lt">23^C / 63^F</div>
                <div className = "humidity">76%</div>
                <div className = "sunrise">06:21 AM</div>
                <div className = "sunset">05:93 PM</div>
              </div>
              
              </div>
          </div>
  )
}

export default WeatherApp