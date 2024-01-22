import React, { useEffect, useState } from "react";
import search_icon from "../assets/Imgs/search.png";
import clear_img from "../assets/Imgs/clear.png";
import humidity_img from "../assets/Imgs/humidity.png";
import wind_img from "../assets/Imgs/wind.png";
import "../assets/Style/style.css";
const Wather = () => {
  const [watherData, setWatherData] = useState();
  const [isAvail, setIsAviail] = useState(false);
  const [inputData, setInputData] = useState("");
  const api_key = "7dcaa284a9ff05fedcaf2ad0c1e26107";
  const handleChange = (e) => {
    setInputData(e.target.value);
  };
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=dhaka&units=Metric&lat=44.34&lon=10.99&appid=${api_key}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWatherData(data);
        setIsAviail(true);
      });
  }, [1]);

  const search = () => {
    if (inputData == "") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&units=Metric&lat=44.34&lon=10.99&appid=${api_key}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Eroor");
        }
        return res.json();
      })
      .then((data) => {
        setWatherData(data);
      })
      .catch((e) => {
        console.log(e);
        setIsAviail(false);
      });
  };
  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          placeholder="search"
          onChange={(e) => {
            handleChange(e);
          }}
          value={inputData}
        />
        <button onClick={search}>
          <img src={search_icon} />
        </button>
      </div>
      {isAvail && (
        <div className="wather_img">
          <img src={clear_img} alt="Wather" />
        </div>
      )}
      <div className="wather_temp">
        <h3>{isAvail ? Math.round(watherData.main.temp) : 0}℃</h3>
      </div>
      <div className="wather_location">
        <h3>{isAvail ? watherData.name : "location"}</h3>
      </div>
      <div className="data_container">
        <div className="element">
          <img src={humidity_img} />
          <div className="data">
            <span className="humidity_percent">
              {isAvail ? Math.round(watherData.main.humidity) : 0}%
            </span>
            <span className="humidity_text">Humidity</span>
          </div>
        </div>
        <div className="element">
          <img src={wind_img} />
          <div className="data">
            <span className="wind_percent">
              {isAvail ? watherData.wind.speed : 0} km/h
            </span>
            <span className="wind_text">Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wather;
