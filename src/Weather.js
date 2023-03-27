import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      iconUrl: response.data.weather[0].icon,
      city: response.data.name,
    });
  }

  function search() {
    let apiKey = "9e55ce91de1e84df9f3dbe33f9c2133a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return "loading...";
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="cityBox">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                className="form-control"
                type="search"
                placeholder="Change City..."
                onChange={handleCityChange}
              />

              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </form>
          <WeatherInfo data={weatherData} />
          <WeatherForecast coordinates={weatherData.coordinates} />
          <footer>
            <a
              href="https://github.com/Lenashvets3/weather-react"
              alt="weather-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-source Code
            </a>
            <span className="name"> by Olena Shvets</span>
          </footer>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
