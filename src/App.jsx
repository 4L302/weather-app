import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeeklyForecast from './components/WeeklyForecast';

const API_KEY = 'c0475edfeff8485982f161122250306'; // WeatherAPI key

const getBackgroundByWeather = (conditionText) => {
  const main = conditionText.toLowerCase();
  if (main.includes('sunny') || main.includes('clear')) return 'clear.jpg';
  if (main.includes('cloud')) return 'clouds.jpg';
  if (main.includes('rain') || main.includes('drizzle')) return 'rain.gif';
  if (main.includes('thunder')) return 'storm.gif';
  if (main.includes('snow')) return 'snow.gif';
  if (main.includes('fog') || main.includes('mist') || main.includes('haze')) return 'fog.jpg';
  return 'clear.jpg';
};

function App() {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=it`
      );
      const data = await res.json();

      if (data && data.location) {
        setWeather({
          current: data.current,
          forecast: data.forecast.forecastday,
          location: data.location,
        });
      } else {
        alert('Città non trovata!');
      }
    } catch (error) {
      console.error('Errore durante il recupero dei dati meteo:', error);
      alert('Errore nel recupero dei dati. Riprova.');
    }
  };

  const background =
    weather && weather.current
      ? getBackgroundByWeather(weather.current.condition.text)
      : 'clear.jpg';

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(/backgrounds/${background})`,
      }}
    >
      {/* Overlay nero trasparente con blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-8 gap-6">
        <h1 className="text-4xl font-bold text-white drop-shadow-md text-center">
          🌦️ Meteo Live
        </h1>

        <SearchBar onSearch={fetchWeather} />

        {weather && (
          <div className="w-full flex flex-col items-center gap-8 mt-4">
            <WeatherCard weather={weather.current} location={weather.location} />
            <WeeklyForecast days={weather.forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
