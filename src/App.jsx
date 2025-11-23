import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  CloudRain,
  Cloud,
  Sun,
  CloudLightning,
  Snowflake,
  CloudFog,
  Calendar,
  ArrowRight,
} from "lucide-react";

// --- Utility: Weather Code Mapping ---
// Open-Meteo uses WMO Weather interpretation codes (0-99)
const getWeatherInfo = (code) => {
  if (code === 0)
    return { label: "Clear Sky", icon: Sun, color: "text-yellow-400" };
  if (code >= 1 && code <= 3)
    return { label: "Partly Cloudy", icon: Cloud, color: "text-blue-200" };
  if (code >= 45 && code <= 48)
    return { label: "Foggy", icon: CloudFog, color: "text-gray-300" };
  if (code >= 51 && code <= 67)
    return { label: "Rain", icon: CloudRain, color: "text-blue-400" };
  if (code >= 71 && code <= 77)
    return { label: "Snow", icon: Snowflake, color: "text-cyan-200" };
  if (code >= 80 && code <= 82)
    return { label: "Heavy Rain", icon: CloudRain, color: "text-blue-600" };
  if (code >= 95)
    return {
      label: "Thunderstorm",
      icon: CloudLightning,
      color: "text-purple-400",
    };
  return { label: "Unknown", icon: Cloud, color: "text-white" };
};

// --- Utility: Date Formatting ---
const formatDate = (dateString) => {
  const options = { weekday: "short", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);

  // Default city on load
  useEffect(() => {
    fetchWeather("New York");
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    setAnimate(false);

    try {
      // 1. Geocoding API to get Lat/Lon
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Weather API
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const data = await weatherRes.json();

      setWeatherData({
        city: name,
        country: country,
        current: data.current,
        daily: data.daily,
      });

      // Trigger animation restart
      setTimeout(() => setAnimate(true), 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query);
    }
  };

  // Determine background gradient based on temperature
  const bgGradient = useMemo(() => {
    if (!weatherData) return "from-slate-900 to-slate-800";
    const temp = weatherData.current.temperature_2m;
    if (temp >= 30) return "from-orange-500 to-red-600"; // Hot
    if (temp >= 20) return "from-orange-400 to-orange-300"; // Warm
    if (temp >= 10) return "from-blue-400 to-blue-500"; // Mild/Cool
    return "from-blue-600 to-cyan-700"; // Cold
  }, [weatherData]);

  const weatherInfo = weatherData
    ? getWeatherInfo(weatherData.current.weather_code)
    : null;
  const WeatherIcon = weatherInfo ? weatherInfo.icon : Sun;

  return (
    <div
      className={`min-h-screen flex items-start md:items-center justify-center p-4 py-8 md:p-8 transition-all duration-1000 bg-gradient-to-br ${bgGradient}`}
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* --- Main Weather Card --- */}
        <div className="md:col-span-2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 text-white shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative z-10 mb-8">
              <div className="flex items-center bg-black/20 rounded-full px-4 py-2 focus-within:bg-black/30 transition-colors border border-white/10">
                <Search className="w-5 h-5 text-white/70 mr-2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search city..."
                  className="bg-transparent border-none outline-none text-white placeholder-white/50 w-full"
                />
              </div>
              {error && (
                <p className="text-red-300 text-sm mt-2 ml-4 absolute">
                  {error}
                </p>
              )}
            </form>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 animate-pulse py-10">
                <div className="w-24 h-24 bg-white/20 rounded-full"></div>
                <div className="w-32 h-8 bg-white/20 rounded-lg"></div>
              </div>
            ) : weatherData ? (
              <div
                className={`transition-all duration-700 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-light tracking-wide flex items-center gap-2">
                      <MapPin className="w-6 h-6" />
                      {weatherData.city}
                      <span className="text-sm font-bold bg-white/20 px-2 py-1 rounded-md">
                        {weatherData.country}
                      </span>
                    </h2>
                    <p className="text-white/80 mt-1 text-lg">
                      {formatDate(new Date())}
                    </p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                    <WeatherIcon
                      className={`w-10 h-10 md:w-12 md:h-12 ${weatherInfo.color}`}
                    />
                  </div>
                </div>

                <div className="mt-8 md:mt-12">
                  <div className="flex items-baseline">
                    <span className="text-6xl md:text-8xl font-bold tracking-tighter">
                      {Math.round(weatherData.current.temperature_2m)}
                    </span>
                    <span className="text-4xl font-light text-white/80 ml-1">
                      °C
                    </span>
                  </div>
                  <p className="text-xl font-medium text-white/90 mt-2 flex items-center gap-2">
                    {weatherInfo.label}
                  </p>
                </div>

                {/* Mini Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors flex sm:block items-center justify-between">
                    <div className="flex items-center gap-2 text-white/70 sm:mb-1">
                      <Wind className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">
                        Wind
                      </span>
                    </div>
                    <span className="text-lg font-semibold">
                      {weatherData.current.wind_speed_10m}{" "}
                      <span className="text-sm font-normal">km/h</span>
                    </span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors flex sm:block items-center justify-between">
                    <div className="flex items-center gap-2 text-white/70 sm:mb-1">
                      <Droplets className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">
                        Humidity
                      </span>
                    </div>
                    <span className="text-lg font-semibold">
                      {weatherData.current.relative_humidity_2m}
                      <span className="text-sm font-normal">%</span>
                    </span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors flex sm:block items-center justify-between">
                    <div className="flex items-center gap-2 text-white/70 sm:mb-1">
                      <Thermometer className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider">
                        Feels Like
                      </span>
                    </div>
                    <span className="text-lg font-semibold">
                      {Math.round(weatherData.current.apparent_temperature)}°
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Decorative huge background icon */}
            {weatherData && (
              <WeatherIcon className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 text-white opacity-5 pointer-events-none" />
            )}
          </div>
        </div>

        {/* --- Forecast Side Panel --- */}
        <div className="h-full">
          <div className="h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white shadow-2xl flex flex-col">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> 7-Day Forecast
            </h3>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-12 bg-white/10 rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : weatherData ? (
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3 min-h-[200px]">
                {weatherData.daily.time.map((time, index) => {
                  // Skip today as it's shown in main card
                  if (index === 0) return null;

                  const code = weatherData.daily.weather_code[index];
                  const dailyInfo = getWeatherInfo(code);
                  const DailyIcon = dailyInfo.icon;

                  return (
                    <div
                      key={time}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-all cursor-default border border-transparent hover:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                          <DailyIcon className={`w-5 h-5 ${dailyInfo.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {formatDate(time)}
                          </p>
                          <p className="text-xs text-white/50">
                            {dailyInfo.label}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-bold">
                          {Math.round(
                            weatherData.daily.temperature_2m_max[index]
                          )}
                          °
                        </span>
                        <span className="block text-xs text-white/50">
                          {Math.round(
                            weatherData.daily.temperature_2m_min[index]
                          )}
                          °
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/50 text-sm min-h-[200px]">
                Search a city to see forecast
              </div>
            )}

            {!loading && weatherData && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group">
                  Detailed Report{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for custom scrollbar in the forecast list */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
