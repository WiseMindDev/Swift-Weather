import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState({
    lat: 40.7128,
    lon: -74.006,
    name: "New York",
  });

  const fetchWeather = async (lat, lon, name) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`
      );
      const data = await response.json();
      setWeather(data);
      setLocation({ lat, lon, name });
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(location.lat, location.lon, location.name);
  }, []);

  const handleSearch = (lat, lon, name) => {
    fetchWeather(lat, lon, name);
  };

  return (
    <div className="app">
      <div className="background"></div>
      <div className="content">
        <header className="header">
          <h1 className="title">SwiftWeather</h1>
          <SearchBar onSearch={handleSearch} />
        </header>

        {error && <div className="error">{error}</div>}

        {loading && <div className="loading">Loading weather...</div>}

        {weather && !loading && (
          <main className="main">
            <WeatherCard
              weather={weather}
              location={location}
              onRefresh={() =>
                fetchWeather(location.lat, location.lon, location.name)
              }
            />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
