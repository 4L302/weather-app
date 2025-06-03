import { motion } from 'framer-motion';

const WeeklyForecast = ({ days }) => {
  if (!days || days.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mt-6 w-full max-w-6xl px-2">
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
            className="bg-white/10 backdrop-blur-md p-4 rounded-2xl text-center shadow-xl border border-white/20 text-white hover:scale-[1.03] transition-transform duration-300"
          >
            <p className="font-semibold text-white/90 mb-1">{date}</p>
            <img src={iconUrl} alt={day.day.condition.text} className="mx-auto w-14 h-14" />
            <p className="text-sm capitalize mt-1">{day.day.condition.text}</p>
            <p className="text-sm mt-1 font-medium">
              {Math.round(day.day.mintemp_c)}° / {Math.round(day.day.maxtemp_c)}°
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WeeklyForecast;
