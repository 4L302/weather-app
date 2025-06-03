import { motion } from 'framer-motion';

const WeeklyForecast = ({ days }) => {
  if (!days || days.length === 0) return null;

  return (
    <div className="row mt-4 gx-3 gy-4 justify-content-center px-2">
      {days.map((day, index) => {
        const date = new Date(day.date).toLocaleDateString('it-IT', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        });

        const iconUrl = `https:${day.day.condition.icon}`;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="col-6 col-sm-4 col-md-3 col-lg-2"
          >
            <div className="card text-center shadow-sm h-100 bg-light bg-opacity-75 border-0 rounded-4">
              <div className="card-body p-3">
                <p className="card-title fw-semibold mb-2">{date}</p>
                <img
                  src={iconUrl}
                  alt={day.day.condition.text}
                  className="mx-auto d-block mb-2"
                  style={{ width: 48, height: 48 }}
                />
                <p className="text-muted small text-capitalize">{day.day.condition.text}</p>
                <p className="fw-bold mb-0">{Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;
