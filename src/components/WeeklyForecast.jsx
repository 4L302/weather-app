import { motion } from 'framer-motion';

const WeeklyForecast = ({ days }) => {
  if (!days || days.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-6 w-full max-w-5xl">
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
            className="bg-white bg-opacity-20 p-4 rounded-xl text-center backdrop-blur-md text-white"
          >
            <p className="font-semibold">{date}</p>
            <img src={iconUrl} alt={day.day.condition.text} className="mx-auto w-12 h-12" />
            <p className="text-sm">{day.day.condition.text}</p>
            <p className="text-sm">
              {Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;
