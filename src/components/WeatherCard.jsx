import { useState } from "react";
import "./WeatherCard.css";
import {
  getWeatherIcon,
  getWeatherDescription,
  getWeatherColor,
} from "../utils/weatherUtils";

const WeatherCard = ({ weather, location, onRefresh }) => {
  const [fahrenheit, setFahrenheit] = useState(true);

  const current = weather.current;
  const daily = weather.daily;

  const temp = fahrenheit
    ? current.temperature_2m
    : ((current.temperature_2m - 32) * 5) / 9;
  const tempMax = fahrenheit
    ? daily.temperature_2m_max[0]
    : ((daily.temperature_2m_max[0] - 32) * 5) / 9;
  const tempMin = fahrenheit
    ? daily.temperature_2m_min[0]
    : ((daily.temperature_2m_min[0] - 32) * 5) / 9;
  const apparentTemp = fahrenheit
    ? current.apparent_temperature
    : ((current.apparent_temperature - 32) * 5) / 9;

  const weatherCode = current.weather_code;
  const weatherColor = getWeatherColor(weatherCode);

  return (
    <div className="weather-card" style={{ borderTopColor: weatherColor }}>
      <div className="weather-header">
        <div className="location-info">
          <h2 className="location">{location.name}</h2>
          <p className="date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <button className="refresh-btn" onClick={onRefresh} title="Refresh">
          ↻
        </button>
      </div>

      <div
        className="current-weather"
        style={{ backgroundColor: `${weatherColor}15` }}
      >
        <div className="weather-icon-large">
          {getWeatherIcon(weatherCode, true)}
        </div>
        <div className="temperature-section">
          <div className="main-temp">
            {Math.round(temp)}°
            <span className="unit">{fahrenheit ? "F" : "C"}</span>
          </div>
          <p className="weather-description">
            {getWeatherDescription(weatherCode)}
          </p>
          <p className="feels-like">Feels like {Math.round(apparentTemp)}°</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <span className="detail-icon">💧</span>
          <div className="detail-content">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{current.relative_humidity_2m}%</p>
          </div>
        </div>
        <div className="detail">
          <span className="detail-icon">💨</span>
          <div className="detail-content">
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">
              {Math.round(current.wind_speed_10m)} mph
            </p>
          </div>
        </div>
        <div className="detail">
          <span className="detail-icon">📊</span>
          <div className="detail-content">
            <p className="detail-label">High/Low</p>
            <p className="detail-value">
              {Math.round(tempMax)}° / {Math.round(tempMin)}°
            </p>
          </div>
        </div>
        <div className="detail">
          <span className="detail-icon">🌧️</span>
          <div className="detail-content">
            <p className="detail-label">Precipitation</p>
            <p className="detail-value">
              {daily.precipitation_sum[0]?.toFixed(2) || "0"} in
            </p>
          </div>
        </div>
      </div>

      <div className="temperature-toggle">
        <button
          className={`toggle-btn ${fahrenheit ? "active" : ""}`}
          onClick={() => setFahrenheit(true)}
        >
          °F
        </button>
        <button
          className={`toggle-btn ${!fahrenheit ? "active" : ""}`}
          onClick={() => setFahrenheit(false)}
        >
          °C
        </button>
      </div>

      <div className="forecast">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-grid">
          {Array.from({ length: 5 }).map((_, idx) => {
            const forecastDate = new Date();
            forecastDate.setDate(forecastDate.getDate() + idx);
            const maxTemp = fahrenheit
              ? daily.temperature_2m_max[idx]
              : ((daily.temperature_2m_max[idx] - 32) * 5) / 9;
            const minTemp = fahrenheit
              ? daily.temperature_2m_min[idx]
              : ((daily.temperature_2m_min[idx] - 32) * 5) / 9;
            const forecastCode = daily.weather_code[idx];

            return (
              <div key={idx} className="forecast-day">
                <p className="forecast-day-name">
                  {forecastDate.toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <div className="forecast-icon">
                  {getWeatherIcon(forecastCode)}
                </div>
                <p className="forecast-temps">
                  {Math.round(maxTemp)}° / {Math.round(minTemp)}°
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
