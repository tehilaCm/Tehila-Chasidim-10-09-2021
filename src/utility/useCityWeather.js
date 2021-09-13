import React from "react";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import {
  getCity,
  getCurrentWeather,
  fiveDaysOfDailyForecasts,
  geoPositionSearch,
} from "../api";
import actions from "../redux/actions";

const useCityWeather = () => {
  const dispatch = useDispatch();

  //get city details, weather, five days of daily forecasts and updating the store
  const getCityWeather = async (city, latLon) => {
    try {
      if (city) {
        const cityData = await getCity(city);
        if (cityData === undefined) return toast.error("City Not Found");
        dispatch(
          actions.setCity({ name: cityData.LocalizedName, key: cityData.Key })
        );

        const weather = await getCurrentWeather(cityData.Key);
        dispatch(actions.setCurrentWeather(weather));

        const forecasts = await fiveDaysOfDailyForecasts(cityData.Key);
        const { DailyForecasts } = forecasts;
        dispatch(actions.setForecasts(DailyForecasts));
      } else if (latLon) {
        const location = await geoPositionSearch(latLon);
        const { Key } = location;
        dispatch(actions.setCity({ name: location.LocalizedName, key: Key }));

        const weather = await getCurrentWeather(Key);
        dispatch(actions.setCurrentWeather(weather));

        const forecasts = await fiveDaysOfDailyForecasts(Key);
        const { DailyForecasts } = forecasts;
        dispatch(actions.setForecasts(DailyForecasts));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return getCityWeather;
};

export default useCityWeather;
