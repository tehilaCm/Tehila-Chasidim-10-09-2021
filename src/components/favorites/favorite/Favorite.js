import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";

import { getCurrentWeather } from "../../../api/index";

import "./favorite.css";

const Favorite = ({ favorite, favorites, setFavorites }) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  const isCelsius = useSelector((state) => state.generalData.isCelsius);

  const degreesFormat =
    currentWeather &&
    (isCelsius
      ? currentWeather.Temperature.Metric.Value
      : currentWeather.Temperature.Imperial.Value);

  const loadCurrentWeather = async () => {
    try {
      // const weather = await getCurrentWeather(favorite.key);
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
    } catch (error) {
      console.log(error);
    }
  };

  const removeCity = () => {
    if (favorites) {
      const tmpFavorites = favorites.filter(
        (item) => item.name != favorite.name
      );
      setFavorites(tmpFavorites);
      localStorage.setItem("favorites", JSON.stringify(tmpFavorites));
    }
  };

  useEffect(() => {
    loadCurrentWeather();
  }, []);

  if (!currentWeather) return null;

  return (
    <div className="favorite">
      <div className="card">
        <Link to={`/?cityName=${favorite.name}`}>
          <div className="card-body">
            <h4>{favorite.name}</h4>
            {isCelsius ? (
              <h6>
                {parseInt(degreesFormat)}{" "}
                <RiCelsiusFill className="degreesFormat" />
              </h6>
            ) : (
              <h6>
                {parseInt(degreesFormat)}{" "}
                <RiFahrenheitFill className="degreesFormat" />
              </h6>
            )}
            <br />
            <h5>{currentWeather.WeatherText}</h5>
          </div>
        </Link>
        <BsTrash className="trash-icon" onClick={removeCity} />
      </div>
    </div>
  );
};

export default Favorite;
