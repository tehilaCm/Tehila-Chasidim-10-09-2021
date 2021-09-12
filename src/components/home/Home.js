import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import toast from "react-hot-toast";

import {
  getCity,
  getCurrentWeather,
  fiveDaysOfDailyForecasts,
} from "../../api";
import CurrentWeather from "../currentWeather/CurrentWeather";
import DailyForecasts from "../dailyForecasts/DailyForecasts";
import DegreesFormat from "../degreesFormat/DegreesFormat";

import "./home.css";

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecasts, setForecasts] = useState([]);
  const [city, setCity] = useState("");
  const [cityInput, setCityInput] = useState("");

  useEffect(() => {
    // getCityWeather("Tel Aviv");
  }, []);

  const getCityWeather = async (city) => {
    try {
      const cityData = await getCity(city);
      if (cityData === undefined) return toast.error("City Not Found");
      setCity(cityData.LocalizedName);
      const weather = await getCurrentWeather(cityData.Key);
      setCurrentWeather(weather);
      const forecasts = await fiveDaysOfDailyForecasts(cityData.Key);
      const { DailyForecasts } = forecasts;
      setForecasts(DailyForecasts);
    } catch (error) {
      console.log(error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const searchedCity = cityInput.trim();
    if (!searchedCity) {
      return toast.error("You Must Type A City");
    }

    try {
      // const cityData = await getCity(searchedCity);

      const cityData = {
        AdministrativeArea: { ID: "TA", LocalizedName: "Tel Aviv" },
        Country: { ID: "IL", LocalizedName: "Israel" },
        Key: "215854",
        LocalizedName: "Tel Aviv",
        Rank: 31,
        Type: "City",
        Version: 1,
      };

      // const cityData = {
      //   AdministrativeArea: { ID: "TA", LocalizedName: "London" },
      //   Country: { ID: "IL", LocalizedName: "United Kingdom" },
      //   Key: "328328",
      //   LocalizedName: "London",
      //   Rank: 10,
      //   Type: "City",
      //   Version: 1,
      // };

      if (cityData === undefined) return toast.error("City Not Found");

      setCity(cityData.LocalizedName);

      //   const weather = await getCurrentWeather(cityData.Key);
      const weather = {
        EpochTime: 1631270100,
        HasPrecipitation: false,
        IsDayTime: true,
        Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        LocalObservationDateTime: "2021-09-10T13:35:00+03:00",
        MobileLink:
          "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        PrecipitationType: null,
        Temperature: {
          Imperial: { Unit: "F", UnitType: 18, Value: 87 },
          Metric: { Unit: "C", UnitType: 17, Value: 30.4 },
        },

        WeatherIcon: 3,
        WeatherText: "Partly sunny",
      };

      setCurrentWeather(weather);

      // const forecasts = await fiveDaysOfDailyForecasts(cityData.Key);
      const forecasts = {
        DailyForecasts: [
          {
            Date: "2021-09-10T07:00:00+03:00",
            Day: {
              HasPrecipitation: false,
              Icon: 3,
              IconPhrase: "Partly sunny",
              EpochDate: 1631246400,
              Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
              MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
            },

            Night: {
              HasPrecipitation: false,
              Icon: 35,
              IconPhrase: "Partly cloudy",
            },

            Temperature: {
              Maximum: {
                Unit: "F",
                UnitType: 18,
                Value: 84,
              },

              Minimum: {
                Unit: "F",
                UnitType: 18,
                Value: 76,
              },
            },
          },
        ],
      };

      const { DailyForecasts } = forecasts;
      setForecasts(DailyForecasts);

      setCityInput("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    let val = e.target.value.replace(/[^\x00-\x7F]+/gi, "");
    setCityInput(val);
  };

  return (
    <div className="home">
      <DegreesFormat />
      <form className="search-form center" onSubmit={handelSubmit}>
        <BsSearch className="serach-icon" />
        <input
          type="text"
          placeholder="Search a city"
          value={cityInput}
          onChange={handleOnChange}
        />
      </form>
      {currentWeather && (
        <CurrentWeather weather={currentWeather} city={city} />
      )}
      {forecasts.length > 0 && currentWeather && <DailyForecasts forecasts={forecasts} />}
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
