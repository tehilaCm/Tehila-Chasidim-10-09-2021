import React from "react";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";

import { getCity, getCurrentWeather, fiveDaysOfDailyForecasts } from "../api";
import actions from "../redux/actions";

const useCityWeather = () => {
  const dispatch = useDispatch();

  const getCityWeather = async (city) => {
    try {
      if (city) {
          // const cityData = await getCity(city);
        const cityData = {
          AdministrativeArea: { ID: "TA", LocalizedName: "Tel Aviv" },
          Country: { ID: "IL", LocalizedName: "Israel" },
          Key: "215854",
          LocalizedName: "Tel Aviv",
          Rank: 31,
          Type: "City",
          Version: 1,
        };
        if (cityData === undefined) return toast.error("City Not Found");
        dispatch(
          actions.setCity({ name: cityData.LocalizedName, key: cityData.Key })
        );

          // const weather = await getCurrentWeather(cityData.Key);
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
        dispatch(actions.setCurrentWeather(weather));
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
        dispatch(actions.setForecasts(DailyForecasts));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return getCityWeather;
};

export default useCityWeather;
