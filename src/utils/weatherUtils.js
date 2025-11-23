const weatherCodes = {
  0: { description: "Clear Sky", icon: "☀️" },
  1: { description: "Mainly Clear", icon: "🌤️" },
  2: { description: "Partly Cloudy", icon: "⛅" },
  3: { description: "Overcast", icon: "☁️" },
  45: { description: "Foggy", icon: "🌫️" },
  48: { description: "Foggy", icon: "🌫️" },
  51: { description: "Light Drizzle", icon: "🌧️" },
  53: { description: "Moderate Drizzle", icon: "🌧️" },
  55: { description: "Dense Drizzle", icon: "🌧️" },
  61: { description: "Slight Rain", icon: "🌧️" },
  63: { description: "Moderate Rain", icon: "🌧️" },
  65: { description: "Heavy Rain", icon: "⛈️" },
  71: { description: "Slight Snow", icon: "❄️" },
  73: { description: "Moderate Snow", icon: "❄️" },
  75: { description: "Heavy Snow", icon: "❄️" },
  77: { description: "Snow Grains", icon: "❄️" },
  80: { description: "Slight Rain Showers", icon: "🌧️" },
  81: { description: "Moderate Rain Showers", icon: "⛈️" },
  82: { description: "Violent Rain Showers", icon: "⛈️" },
  85: { description: "Slight Snow Showers", icon: "❄️" },
  86: { description: "Heavy Snow Showers", icon: "❄️" },
  95: { description: "Thunderstorm", icon: "⛈️" },
  96: { description: "Thunderstorm with Hail", icon: "⛈️" },
  99: { description: "Thunderstorm with Hail", icon: "⛈️" },
};

export const getWeatherDescription = (code) => {
  return weatherCodes[code]?.description || "Unknown";
};

export const getWeatherIcon = (code) => {
  return weatherCodes[code]?.icon || "🌤️";
};

export const getWeatherColor = (code) => {
  if (code === 0 || code === 1) return "#FFB347";
  if (code === 2 || code === 3) return "#87CEEB";
  if (code === 45 || code === 48) return "#A9A9A9";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "#4A90E2";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "#E0E7FF";
  if ([95, 96, 99].includes(code)) return "#7B68EE";
  return "#667eea";
};
