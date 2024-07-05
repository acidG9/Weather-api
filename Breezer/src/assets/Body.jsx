import React from "react";

function Body() {

  const [city,setCity]=React.useState("");
  const apiKey = "62419947539d4eb083a200928240407";

  function handelCity(event){
    setCity(event.target.value);
  }

  async function handleResult(){

    try {
     const rawData= await fetch("https://api.weatherapi.com/v1/forecast.json?key="+apiKey+"&q="+city+"&days=5&aqi=yes&alerts=yes");
     const data= await rawData.json();
     console.log(data);
    } catch (error) {
     console.log("api is not able to fetch data 🫠🫠");
     console.log(error);
    }
  }

    return(
        <>
          <input type="text" name="city" id="searchBar" onChange={handelCity} value={city}/>
          <button onClick={handleResult}>Search</button>
        </>
    );
}

export default Body