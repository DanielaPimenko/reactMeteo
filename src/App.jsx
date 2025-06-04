import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import WeatherInfo from "./components/WeatherInfo";
import Forecast from "./components/Forecast";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecast([]);

    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!weatherRes.ok) throw new Error("Failed to fetch current weather");
      const weather = await weatherRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!forecastRes.ok) throw new Error("Failed to fetch forecast");
      const forecastData = await forecastRes.json();

      const filteredForecast = forecastData.list.filter((_, index) => index % 8 === 0);

      setWeatherData(weather);
      setForecast(filteredForecast);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Porto");
  }, []);

  const handleSearch = (city) => {
    fetchWeatherData(city);
  };

  return (
    <div className="wrapper">
      <h1>Insert City</h1>
      <SearchInput onSearch={handleSearch} />

      {loading && <div className="loading">Loading weather data...</div>}
      {error && <p className="error">{error}</p>}

      {weatherData && <WeatherInfo data={weatherData} />}
      {forecast.length > 0 && <Forecast data={forecast} />}
    </div>
  );
};

export default App;
