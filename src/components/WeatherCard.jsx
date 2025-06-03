import { motion } from 'framer-motion';

const WeatherCard = ({ weather, location }) => {
  if (!weather || !location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-20 p-6 rounded-xl text-white text-center backdrop-blur-md shadow-xl w-full max-w-md"
    >
      <h2 className="text-2xl font-bold">
        {location.name}
        {location.region ? `, ${location.region}` : ''}, {location.country}
      </h2>

      <p className="text-xl mt-2">{weather.temp_c}°C</p>

      <img
        src={`https:${weather.condition.icon}`}
        alt={weather.condition.text}
        className="mx-auto w-20 h-20"
      />

      <p className="capitalize">{weather.condition.text}</p>

      <div className="mt-2 text-sm space-y-1">
        <p>🌡️ Umidità: {weather.humidity}%</p>
        <p>💨 Vento: {weather.wind_kph} km/h</p>
        <p>🌅 Alba: {location.localtime.split(' ')[1]}</p>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
