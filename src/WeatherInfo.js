import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1 id="city-name">
        {props.data.city}
        <br />
      </h1>

      <h1 id="time">
        <ul>
          <li>
            <FormattedDate date={props.data.date} />
          </li>
        </ul>
      </h1>

      <div className="currentTemp">
        <WeatherTemperature celsius={props.data.temperature} />
      </div>
      <img
        alt={props.data.description}
        src={`http://openweathermap.org/img/wn/${props.data.iconUrl}@2x.png`}
        id="icon"
      />

      <ul className="indicators">
        <li>
          • <span id="description">{props.data.description}</span>
        </li>
        <li>
          • humidity: <span id="humidity">{props.data.humidity}</span>%
        </li>
        <li>
          • wind: <span id="wind">{props.data.wind}</span>km/hr
        </li>
      </ul>
    </div>
  );
}
