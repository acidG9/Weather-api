import React from "react";

function Body() {

  const [apiLink,setApiLink]=React.useState("");
  const [city,setCity]=React.useState("");

  function handleLink(){
    setApiLink("http://api.weatherapi.com/v1/search.json?key=62419947539d4eb083a200928240407&q="+city);
  }

  function handleCity(event){
    setCity(event.target.value);
  }

  async function handleResult(){

    try {
     const rawData= await fetch(apiLink);
     const data= await rawData.json();
     console.log(data);
    } catch (error) {
     console.log("api is not able to fetch data 🫠🫠"); 
    }
  }

    return(
        <>
          <input type="text" name="city" id="searchBar" onChange={handleCity} value={city}/>
          <button className="searchBtn" onClick={handleLink}>Search</button>
          <button className="resultBtn" onClick={handleResult}>getResult</button>
        </>
    );
}

export default Body