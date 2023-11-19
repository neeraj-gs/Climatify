import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { apiKeys } from "./apiKeys";
import axios from "axios";
import ReactAnimatedWeather from 'react-animated-weather'
import { WeatherResponse } from './types';

interface ForecastProps {
  icon: string;
  weather: string;
}

const Forcast: React.FC<ForecastProps> = (props) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<{ message: string; query: string }>({ message: "", query: "" });
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const search = (city: string) => {
    axios
      .get(`${apiKeys.base}weather?q=${city}&units=metric&APPID=${apiKeys.key}`)
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather(null);
        setQuery("");
        setError({ message: "Not Found , Enter a Correct City Name", query });
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Bengaluru");
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
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)}
            />
          </div>
        </div>
        <ul>
          {weather && weather.main ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Weather icon"
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
