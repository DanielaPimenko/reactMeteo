const WeatherInfo = ({ data }) => {
  if (!data) return null;

  return (
    <>
      <div>
        <h1 className="city">{data.name}</h1>
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div >
          <span className="temp-range">Max {Math.round(data.main.temp_max)}°</span>
          <span>Min {Math.round(data.main.temp_min)}°</span>
        </div>
        <p className="condition">{data.weather[0].main}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <p>Humidity</p>
          <p className="value">{data.main.humidity}%</p>
        </div>
        <div className="detail-item">
          <p>Wind</p>
          <p className="value">{Math.round(data.wind.speed * 3.6)} km/h</p>
        </div>
      </div>
    </>
  );
};

export default WeatherInfo;