import { useState, useEffect } from "react";
import moment from "moment-timezone";
import TodayForecast from "./TodayForecast";

function Body() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
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
        setCurrentDate(localDate.format("D MMMM YYYY, dddd"));
        setCurrentTime(localDate.format("h:mm:ss A"));
      }, 1000);

      return () => clearInterval(intervalId); // Clear interval on unmount
    }
  }, [weatherData]);

  return (
    <>
      <div className="top">
        <h1 className="heading">Breezer</h1>
      </div>

      <div className="middle">

        <div className="midFirst">

          <div className="mid1Top"> 

           <div className="dayNight">
 
             {weatherData?.current?.is_day ? (
               <img src="/src/assets/img/sun.gif" alt="sun" />
             ) : (
               <img src="/src/assets/img/moon.gif" alt="moon" />
             )}
           </div>
 
           <div className="date-time">
             {currentTime && (
               <>
                 <div className="time"><h2>{currentTime || "Loading..."}</h2></div>
                 <div className="date">{currentDate || "Loading..."}</div>
               </>
             )}
           </div>

          </div>

          <div className="mid1Mid">
            <TodayForecast propData={weatherData} />
          </div>

        </div>

        <div className="midSecond">

          <div className="mid2Top">

           <div className="location">
            <h2>{weatherData?.location?.name}</h2>
            <p> <img src="/src/assets/img/compass.gif" alt="compass" /> {weatherData?.location?.region}, {weatherData?.location?.country}</p>
           </div>
 
           <div className="navigation">
 
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

          </div>

          <div className="mid2Mid">

            <div className="temp-weather">

              <div className="temp">{weatherData?.current?.temp_c}</div>

              <div className="weather">{weatherData?.current?.condition?.text}</div>

            </div>

            <div className="weatherDetails">

              <div className="humidity">{weatherData?.current?.humidity} %</div>

              <div className="pressure">{weatherData?.current?.pressure_mb} mb</div>

              <div className="windSpeed">{weatherData?.current?.wind_kph} KmpH</div>

              <div className="visibility">{weatherData?.current?.vis_km} Km</div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Body;
