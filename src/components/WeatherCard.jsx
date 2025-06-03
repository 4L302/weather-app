import { motion } from 'framer-motion';

const WeatherCard = ({ weather, location }) => {
  if (!weather || !location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="card shadow-lg p-4 text-dark bg-light bg-opacity-75 w-100 max-w-md mx-auto"
    >
      <div className="card-body text-center">
        <h2 className="card-title h4 fw-bold mb-2">
          {location.name}
          {location.region ? `, ${location.region}` : ''}, {location.country}
        </h2>

        <h3 className="display-6 mb-2">{weather.temp_c}°C</h3>

        <img
          src={`https:${weather.condition.icon}`}
          alt={weather.condition.text}
          className="mx-auto d-block mb-2"
          style={{ width: 80, height: 80 }}
        />

        <p className="text-capitalize fw-semibold mb-3">{weather.condition.text}</p>

        <div className="d-flex justify-content-around flex-wrap gap-2 small">
          <span>🌡️ Umidità: {weather.humidity}%</span>
          <span>💨 Vento: {weather.wind_kph} km/h</span>
          <span>🌅 Alba: {location.localtime.split(' ')[1]}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
