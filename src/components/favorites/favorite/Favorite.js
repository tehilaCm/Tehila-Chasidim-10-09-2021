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

  useEffect(() => {
    loadCurrentWeather();
  }, []);

  const loadCurrentWeather = async () => {
    try {
      const weather = await getCurrentWeather(favorite.key);
      setCurrentWeather(weather);
    } catch (error) {
      console.log(error);
    }
  };

  //remove city from favorite and update local storage
  const removeCity = () => {
    if (favorites) {
      const tmpFavorites = favorites.filter(
        (item) => item.name != favorite.name
      );
      setFavorites(tmpFavorites);
      localStorage.setItem("favorites", JSON.stringify(tmpFavorites));
    }
  };

  if (!currentWeather) return null;

  //Display the component only if currentWeather exsists
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
