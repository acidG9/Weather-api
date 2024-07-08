import { useState, useEffect } from "react";
import moment from "moment-timezone";

function Body() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const apiKey = "62419947539d4eb083a200928240407";

  function handleCity(event) {
    setCity(event.target.value);
  }

  async function fetchWeatherData(query) {
    try {
      const rawData = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=5&aqi=yes&alerts=yes`
      );
      const data = await rawData.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log("API is not able to fetch data 🫠🫠");
      console.log(error);
    }
  }

  function handleResult() {
    const query = city || "Bengaluru";
    fetchWeatherData(query);
  }

  useEffect(() => {
    fetchWeatherData("Bengaluru");
  }, []);

  useEffect(() => {
    if (weatherData) {
      const intervalId = setInterval(() => {
        const localDate = moment.tz(moment(), weatherData.location.tz_id);
        setCurrentTime(localDate.format("YYYY-MM-DD HH:mm:ss"));
      }, 1000);

      return () => clearInterval(intervalId); // Clear interval on unmount
    }
  }, [weatherData]);

  return (
    <>
      <div className="top">
        <h1 className="heading">Breezer</h1>
        <button className="btnForecast">Forecast</button>
        <button className="btnAdvance">Advance</button>
        <input
          type="text"
          name="city"
          id="searchBar"
          onChange={handleCity}
          value={city}
        />
        <button onClick={handleResult} className="searchBtn">
          Search
        </button>
      </div>

      <div className="middle">
        <div className="midFirst">
          <div className="dayNight">
            {weatherData?.current?.is_day ? (
              <img src="/src/assets/img/sun.gif" alt="sun" />
            ) : (
              <img src="/src/assets/img/moon.gif" alt="moon" />
            )}
          </div>
          <div className="date">
            {currentTime || "Loading..."}
          </div>
        </div>

        <div className="midSecond">
          <h2>{weatherData?.location?.name}</h2>
          <p>Temperature: {weatherData?.current?.temp_c} °C</p>
          <p>Condition: {weatherData?.current?.condition.text}</p>
        </div>
      </div>
    </>
  );
}

export default Body;

