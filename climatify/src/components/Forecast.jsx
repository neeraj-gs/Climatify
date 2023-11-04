//THis is a componet that  shows all the temperatur enad weather detaisl in the second compoent
//used hooks

import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { apiKeys } from "./apiKeys";
import axios from "axios";
import ReactAnimatedWeather from 'react-animated-weather'




const Forcast =(props) =>{
    const [query, setQuery] = useState(""); //searching of the econd component [we can also have a dropdown menu giveng diffrrent cities or places of the world]
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({}); //calling the weather to store the respionse
    //stores weather data obtained from api


    const search = (city) => { //once we get the query request we search it
        axios
          .get(
            `${apiKeys.base}weather?q=${ //api is hit again for the city
              city != "[object Object]" ? city : query //if city is an object , if data isnnot cleared predefined is given , if not query passed in search bar is shown
            }&units=metric&APPID=${apiKeys.key}`
          )
          .then((response) => {
            setWeather(response.data);
            setQuery(""); //clear the search bar after data is fetched 
          })
          .catch(function (error) {
            console.log(error);
            setWeather("");
            setQuery("");
            setError({ message: "Not Found , Enter a Correct City Name", query: query });
          });
      };

      // function checkTime(i) {
      //   if (i < 10) {
      //     i = "0" + i;
      //   } // add zero in front of numbers < 10
      //   return i;
      // }

      const defaults = {
        color: "white",
        size: 112,
        animate: true,
      };


      useEffect(() => {
        search("Delhi");
      }, []);


      return (
        <div className="forecast">
          <div className="forecast-icon">
            <ReactAnimatedWeather
              icon={props.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
          <div className="today-weather">
            <h3>{props.weather}</h3>
            <div className="search-box">
              <input
                type="text"
                className="search-bar"
                placeholder="Search any City"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <div className="img-box">
                {" "}
                <img
                  src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
                  onClick={search}
                />
              </div>
            </div>
            <ul>
              {typeof weather.main != "undefined" ? (
                <div>
                  {" "}
                  <li className="cityHead">
                    <p>
                      {weather.name}, {weather.sys.country}
                    </p>
                    <img
                      className="temp"
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    />
                  </li>
                  <li>
                    Temperature{" "}
                    <span className="temp">
                      {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                    </span>
                  </li>
                  <li>
                    Humidity{" "}
                    <span className="temp">
                      {Math.round(weather.main.humidity)}%
                    </span>
                  </li>
                  <li>
                    Visibility{" "}
                    <span className="temp">
                      {Math.round(weather.visibility)} mi
                    </span>
                  </li>
                  <li>
                    Wind Speed{" "}
                    <span className="temp">
                      {Math.round(weather.wind.speed)} Km/h
                    </span>
                  </li>
                </div>
              ) : (
                <li>
                  {error.query} {error.message}
                </li>
              )}
            </ul>
          </div>
        </div>
      );
    

}


Forcast.propTypes = {
  icon: PropTypes.string.isRequired, // Validate 'icon' as a required string prop
  weather: PropTypes.string.isRequired, // Validate 'weather' as a required string prop
};

export default Forcast;