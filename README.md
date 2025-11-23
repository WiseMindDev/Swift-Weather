# SwiftWeather - Modern Weather App

A beautiful, responsive weather application built with React and Vite, powered by the Open-Meteo public API.

## Features

✨ **Modern Design**

- Beautiful gradient background with smooth animations
- Responsive layout that works on all devices
- Glass-morphism card design with smooth transitions
- Floating weather animations

🌍 **Location Search**

- Search for any city worldwide using the Open-Meteo Geocoding API
- Autocomplete suggestions as you type
- One-click selection to update weather

📊 **Weather Information**

- Current temperature, conditions, and "feels like" temperature
- Humidity levels
- Wind speed
- High/Low temperatures
- Precipitation forecast
- 5-day weather forecast

🌡️ **Temperature Units**

- Toggle between Fahrenheit and Celsius
- Automatic conversion for all temperature displays

⚡ **Real-time Updates**

- One-click refresh button
- Smooth loading states
- Error handling with user-friendly messages

📱 **Progressive Web App (PWA)**

- Works offline with service worker caching
- Install as native app on mobile and desktop
- Works on all modern browsers
- Add to home screen with one click

## Getting Started

### Using as a PWA

**Desktop (Chrome, Edge, Brave, etc.):**

1. Open the app in your browser
2. Look for the install icon in the address bar
3. Click to install
4. The app appears in your applications menu and taskbar

**Mobile (iOS Safari or Chrome):**

1. Open the app in Safari or Chrome
2. Tap Share/Menu (⋮)
3. Select "Add to Home Screen"
4. Access your weather app like any native app

### Local Development

#### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

#### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd swiftweather
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

#### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

#### Build for Production

Build for production:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## API

This app uses the free Open-Meteo API:

- **Weather API**: https://open-meteo.com/
- **Geocoding API**: https://geocoding-api.open-meteo.com/

No API key required!

## PWA Features

SwiftWeather is a Progressive Web App with the following capabilities:

### Offline Support

- Service worker caches essential assets
- Works offline after first load
- Automatic cache updates

### Installation

- Install like a native app on desktop (Windows, Mac, Linux)
- Add to home screen on mobile (Android, iOS)
- Native app icon and launch screen
- Full-screen experience when installed

### Native Features

- Works in standalone mode (no browser UI)
- Fast loading and smooth performance
- Responsive design for all screen sizes
- Auto-updates when new versions are available

### Manifest Configuration

- Custom app name and icon
- Theme colors matching the UI
- App categories and shortcuts
- App screenshots for install prompts

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features (gradients, animations)
- **Open-Meteo API** - Weather and location data
- **Vite PWA Plugin** - Progressive Web App support
- **Service Workers** - Offline functionality and caching

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx       # Location search component
│   ├── SearchBar.css
│   ├── WeatherCard.jsx     # Main weather display
│   └── WeatherCard.css
├── utils/
│   └── weatherUtils.js     # Weather code mappings and utilities
├── App.jsx                 # Main app component
├── App.css
├── index.css
└── main.jsx
```

## Features in Detail

### SearchBar Component

- Real-time location search using Open-Meteo Geocoding API
- Displays city name, state/province, and country
- Smooth dropdown with hover effects
- Search results refresh on focus

### WeatherCard Component

- Displays current weather conditions
- Shows 5-day forecast
- Weather icons based on WMO codes
- Details panel with humidity, wind, temperature range, and precipitation
- Color-coded weather types (sunny, cloudy, rainy, etc.)

### Weather Utils

- WMO Weather interpretation code mappings
- Emoji icons for different weather conditions
- Color theming based on weather type

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized with Vite for fast builds
- Lazy loading and code splitting ready
- Smooth CSS animations with GPU acceleration
- Efficient API calls with caching

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## Weather Codes Reference

The app uses WMO Weather interpretation codes:

- **0-3** - Clear to overcast skies
- **45-48** - Foggy conditions
- **51-55** - Drizzle
- **61-65** - Rain
- **71-77** - Snow
- **80-82** - Rain showers
- **85-86** - Snow showers
- **95-99** - Thunderstorms

---

**Enjoy checking the weather with SwiftWeather!** ⛅
