const Forecast = ({ data }) => {
  if (!data.length) return null;

  return (
    <div className="forecast">
      <h2 className="forecast-header">5-Day Forecast</h2>
      <div className="forecast-days">
        {data.map((day) => (
          <div key={day.dt} className="forecast-day">
            <p className="forecast-date">
              {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                weekday: "short"
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt={day.weather[0].description}
              className="forecast-icon"
            />
            <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;