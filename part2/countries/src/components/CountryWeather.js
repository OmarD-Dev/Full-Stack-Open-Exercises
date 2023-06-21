import { useState, useEffect } from "react";
import axios from "axios";
const CountryWeather = ({ capital, latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching weather data", error);
        setWeatherData(null);
      });
  };

  useEffect(() => {
    fetchWeatherData();
  }, [latitude, longitude]);

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }
  const { main, weather, wind } = weatherData;
  const temperatureInCelsius = Math.round(main.temp - 273.15);
  const windSpeed = `${wind.speed} m/s`;
  const weatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  };
  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {temperatureInCelsius}°C</p>
      <img src={weatherIconUrl(weather[0].icon)} alt={weather[0].description} />
      <p>Wind: {windSpeed}</p>
    </>
  );
};
export default CountryWeather;
