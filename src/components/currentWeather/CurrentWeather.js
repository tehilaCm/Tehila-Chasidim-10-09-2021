import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import day from "../../assets/day.svg";
import night from "../../assets/night.svg";

import "./currentWeather.css";

const CurrentWeather = ({ weather, city }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );

  const iconSrc =
    require(`../../assets/icons/${weather.WeatherIcon}.svg`).default;

  const isCelsius = useSelector((state) => state.generalData.isCelsius);
  const degreesFormat = isCelsius
    ? weather.Temperature.Metric
    : weather.Temperature.Imperial;

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")));
    if (favorites) {
      const res = favorites.find((item) => item === city);
      if (res) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } else {
      setIsFavorite(false);
    }
  }, [city]);

  const toggleFavorites = () => {
    let tmpFavorites = [];
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!isFavorite) {
      if (favorites) tmpFavorites = [...favorites, city];
      else tmpFavorites = [city];
      localStorage.setItem("favorites", JSON.stringify(tmpFavorites));
      setIsFavorite(true);
    } else {
      if (favorites) tmpFavorites = favorites.filter((item) => item != city);
      localStorage.setItem("favorites", JSON.stringify(tmpFavorites));
      setIsFavorite(false);
    }
  };

  return (
    <div className="current-weather">
      <div className="card weather">
        <img className="card-img-top" src={weather.IsDayTime ? day : night} />
        <div className="card-body">
          <img src={iconSrc} className="icon" />
          {isFavorite ? (
            <FaHeart className="favorite-icon red" />
          ) : (
            <FaRegHeart className="favorite-icon" />
          )}
          <h1 className="city">{city}</h1>
          <p className="description">{weather.WeatherText}</p>
          <h1 className="degrees">
            {parseInt(degreesFormat.Value)}{" "}
            {degreesFormat.Unit === "C" ? (
              <RiCelsiusFill className="degreesFormat" />
            ) : (
              <RiFahrenheitFill className="degreesFormat" />
            )}
          </h1>
          <button className="btn btn-primary" onClick={toggleFavorites}>
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
