import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const API_KEY = 'c0475edfeff8485982f161122250306';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
        );
        const data = await res.json();
        setSuggestions(data.slice(0, 5));
      } catch (err) {
        console.error('Errore nei suggerimenti città:', err);
        setSuggestions([]);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    const full = `${city.name}, ${city.region ? city.region + ', ' : ''}${city.country}`;
    onSearch(full);
    setQuery('');
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      onSearch(query);
      setQuery('');
      setSuggestions([]);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={containerRef}>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Inserisci città..."
          className="w-full p-3 rounded-l-xl text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <button
          type="submit"
          className="bg-orange-400 px-5 rounded-r-xl text-white hover:bg-orange-500 transition"
        >
          Cerca
        </button>
      </form>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute z-20 bg-white text-black w-full mt-1 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelect(city)}
                className="p-3 cursor-pointer hover:bg-orange-100 transition text-sm"
              >
                {city.name}
                {city.region ? `, ${city.region}` : ''}, {city.country}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
