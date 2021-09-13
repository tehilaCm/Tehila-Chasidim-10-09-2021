import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { BsSearch } from "react-icons/bs";
import toast from "react-hot-toast";
import { useLocation, useHistory } from "react-router-dom";

import useCityWeather from "../../utility/useCityWeather";

import CurrentWeather from "../currentWeather/CurrentWeather";
import DailyForecasts from "../dailyForecasts/DailyForecasts";
import DegreesFormat from "../degreesFormat/DegreesFormat";
import ThemeBtn from "../themeBtn/ThemeBtn";

import "./home.css";

const Home = () => {
  const [cityInput, setCityInput] = useState("");

  const getCityWeather = useCityWeather();

  const { city, currentWeather, forecasts } = useSelector((state) => {
    return {
      city: state.weather.city,
      currentWeather: state.weather.currentWeather,
      forecasts: state.weather.forecasts,
    };
  });

  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();

  useEffect(() => {
    //User will be redirect to home page after clicking a favorite city
    //In this case we'll have the city name as a param in the URL
    const cityName = query.get("cityName");
    if (cityName) {
      getCityWeather(cityName);
      //Clear URL from the city param
      query.delete("cityName");
      history.replace({
        search: query.toString(),
      });
    } else {
      //Display to the user by default his current location by reciving
      //latitude and longitude from geolocation
      function success(pos) {
        let crd = pos.coords;
        getCityWeather(null, `${crd.latitude},${crd.longitude}`);
      }

      function error(err) {
        //In case the geolocation failed to get lat/lon
        getCityWeather("Tel Aviv");
      }

      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();

    //Toast in case the user submitted empty string
    const searchedCity = cityInput.trim();
    if (!searchedCity) {
      return toast.error("You Must Type A City");
    }

    getCityWeather(searchedCity);

    setCityInput("");
  };

  //Searching will be done in English letters only
  //Converting non English letters by empty string
  const handleOnChange = (e) => {
    let val = e.target.value.replace(/[^\x00-\x7F]+/gi, "");
    setCityInput(val);
  };

  return (
    <div className="home">
      <div className="top-container">
        <DegreesFormat />
        <ThemeBtn />
      </div>
      <form className="search-form center" onSubmit={handelSubmit}>
        <BsSearch className="serach-icon" />
        <input
          type="text"
          placeholder="Search a city"
          value={cityInput}
          onChange={handleOnChange}
        />
      </form>
      {currentWeather && city && (
        <CurrentWeather weather={currentWeather} city={city} />
      )}
      {forecasts && forecasts.length > 0 && currentWeather && (
        <DailyForecasts forecasts={forecasts} />
      )}
    </div>
  );
};

export default Home;

/*
 


 Array(5)
0: {Date: "2021-09-10T07:00:00+03:00", EpochDate: 1631246400, Temperature: {…}, Day: {…}, Night: {…}, …}
1: {Date: "2021-09-11T07:00:00+03:00", EpochDate: 1631332800, Temperature: {…}, Day: {…}, Night: {…}, …}
2: {Date: "2021-09-12T07:00:00+03:00", EpochDate: 1631419200, Temperature: {…}, Day: {…}, Night: {…}, …}
3: {Date: "2021-09-13T07:00:00+03:00", EpochDate: 1631505600, Temperature: {…}, Day: {…}, Night: {…}, …}
4: {Date: "2021-09-14T07:00:00+03:00", EpochDate: 1631592000, Temperature: {…}, Day: {…}, Night: {…}, …}
length: 5



0:

*/
