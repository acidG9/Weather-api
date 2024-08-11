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

      return () => clearInterval(intervalId); 
    }
  }, [weatherData]);

  return (
    <>
      <div className="top">
        <h1>Breezer</h1>
      </div>

      <div className="mid">

        <div className="mid1">

          <div className="mid1Top"> 

           <div className="day-night">
 
             {weatherData?.current?.is_day ? (
               <img src="/assets/sun-DQirFo_6.gif" alt="sun" 
               onError={event => {
                event.target.src = "/src/assets/img/sun.gif"
                event.onerror = null
              }}
               />
             ) : (
               <img src="/assets/moon-DTuMHkbv.gif" alt="moon"
               onError={event => {
                event.target.src = "/src/assets/img/moon.gif"
                event.onerror = null
              }}
               />
             )}
           </div>
 
           <div className="date-time">
             {currentTime && (
               <>
                 <div className="time"><h1>{currentTime || "Loading..."}</h1></div>
                 <div className="date"><p>{currentDate || "Loading..."}</p></div>
               </>
             )}
           </div>

          </div>

          <div className="mid1mid">
           <h2>Today&apos;s Forecast</h2>
          </div>

          <div className="mid1btm">
            <TodayForecast propData={weatherData} />
          </div>

        </div>

        <div className="mid2">

          <div className="mid2MobileClock"> 
 
           {weatherData?.current?.is_day ? (
               <img src="/assets/sun-DQirFo_6.gif" alt="sun" 
               onError={event => {
                event.target.src = "/src/assets/img/sun.gif"
                event.onerror = null
              }}
               />
           ) : (
            <img src="/assets/moon-DTuMHkbv.gif" alt="moon"
            onError={event => {
             event.target.src = "/src/assets/img/moon.gif"
             event.onerror = null
           }}
            />
           )} 
           {currentTime && (
             <div>
               <div className="time"><h1>{currentTime || "Loading..."}</h1></div>
               <div className="date"><p>{currentDate || "Loading..."}</p></div>
             </div>
           )}

          </div>

          <div className="mid2Top">

           <div className="location">
            <img src="/assets/location-DEdRbkHx.gif" alt="location-icon"
               onError={event => {
                event.target.src = "/src/assets/img/location.gif"
                event.onerror = null
              }}
               /> 
            <div>
             <h2> {weatherData?.location?.name}</h2>
             <p> {weatherData?.location?.region}, {weatherData?.location?.country}</p>
            </div>
           </div>
 
           <div className="navigation">
 
            <input
             type="text"
             name="city"
             id="searchBar"
             onChange={handleCity}
             value={city}
             placeholder="Search..."
            />
            <button onClick={handleResult} className="searchBtn">
              Search
            </button>
 
           </div>

          </div>

          <div className="mid2Mid">

            <div className="temp-weather">

              <div className="weatherText">

               <div className="temp"><p>{weatherData?.current?.temp_c}°</p></div>

               <div className="weather"><p>{weatherData?.current?.condition?.text}</p></div>

              </div>

              <div className="weatherImage">

               <img src={weatherData?.current?.condition?.icon} alt="weather-icon" />

              </div>

            </div>
            
            <div className="weatherDetails">
              <div className="humidity">
                <p>Humidity</p>
                <div className="data">{weatherData?.current?.humidity} %</div>
              </div>
              <div className="pressure">
                <p>Pressure</p>
                <div className="data">{weatherData?.current?.pressure_mb} mb</div>
              </div>
              <div className="windSpeed">
                <p>Wind</p>
                <div className="data">{weatherData?.current?.wind_kph} KmpH</div>
              </div>
              <div className="visibility">
                <p>Visibility</p>
                <div className="data">{weatherData?.current?.vis_km} Km</div>
              </div>
           </div>

          </div>

          <div className="mobileForecast">

           <div className="mid1mid">
            <h2>Today&apos;s Forecast</h2>
           </div>

           <div className="mid1btm">
             <TodayForecast propData={weatherData} />
           </div>

          </div>

          <div className="mid2Btm">
            
            <div className="airQuality">
              <p>Air Quality</p>
              <p>AQI : {weatherData?.current?.air_quality?.['us-epa-index']}</p>
              <p>SO2 : {weatherData?.current?.air_quality?.so2}</p>
              <p>NO2 : {weatherData?.current?.air_quality?.no2}</p>
              {/* <p>O3 : {weatherData?.current?.air_quality?.o3}</p> */}
              {/* <p>Pm2_5 : {weatherData?.current?.air_quality?.pm2_5}</p> */}
              <p>CO : {weatherData?.current?.air_quality?.co}</p>
              <p className="Pm10">Pm10 : {weatherData?.current?.air_quality?.pm10}</p>
              {/* <p>{weatherData?.current?.air_quality?.gb_defra_index}</p> */}
            </div>

            <div className="max-min-uv">

              <div className="max-min">
                <p>Extreme</p>
                <p>Max Temprature : {weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c} °C</p>
                <p className="avgTemp">Avg Temprature : {weatherData?.forecast?.forecastday[0]?.day?.avgtemp_c} °C</p>
                <p>Min Temprature : {weatherData?.forecast?.forecastday[0]?.day?.mintemp_c} °C</p>
              </div>
              <div className="uv">
                <p>{weatherData?.current?.uv} UVI</p>
                {weatherData?.current?.uv <3 ? <p>No Risk</p> : 
                (weatherData?.current?.uv <6 ? <p>Moderate Risk</p> : 
                (weatherData?.current?.uv <8 ? <p>High Risk</p> : 
                <p>Extreme Risk</p>)) }
              </div>

            </div>

            <div className="rise-set">
              <p>Astro</p>
              <p>Sunrise: {weatherData?.forecast?.forecastday[0]?.astro?.sunrise}</p>
              <p>Sunset: {weatherData?.forecast?.forecastday[0]?.astro?.sunset}</p>
              <p>Moonrise: {weatherData?.forecast?.forecastday[0]?.astro?.moonrise}</p>
              <p>Moonset: {weatherData?.forecast?.forecastday[0]?.astro?.moonset}</p>
              <p className="moonPhase">Moon Phase: {weatherData?.forecast?.forecastday[0]?.astro?.moon_phase}</p>
            </div>

          </div>

        </div>
      </div>
      <div className="btm">
       <p>Copyright &copy; {new Date().getFullYear()} <u>Akshansh Vaishnav</u> All rights reserved</p>
      </div>
    </>
  );
}

export default Body;
