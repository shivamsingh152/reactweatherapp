import React, { useEffect, useState } from "react";
import "./style.css";
import Weather from "./Weather";

const Temp = () => {
   const [searchValue, setSearchValue] = useState('Bhilwara');
   const [tempInfo, setTempInfo] = useState({});

   const getWeatherInfo = async () =>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
      &units=metric&appid=${process.env.REACT_APP_APP_ID}`;

      const res = await fetch(url);
      const data = await res.json();

      const {temp, humidity, pressure} = data.main;
      const {main: weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys;

      const myNewWeather = {
           temp,
           humidity,
           pressure,
           weathermood,
           name,
           speed,
           country,
           sunset,
      }

      setTempInfo(myNewWeather);
    } catch (error) {
      console.log(error);
    }
   };

   useEffect(() => {
    getWeatherInfo()
    // eslint-disable-next-line
   }, []);
   

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search here!"
            autoFocus
            id="search"
            className="searchTerm"
            value={ searchValue }
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {/* temp card */}
      <Weather tempInfo={tempInfo}/> 
    </>
  );
};

export default Temp;
