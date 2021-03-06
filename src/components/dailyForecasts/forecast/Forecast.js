import React from "react";
import { useSelector } from "react-redux";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";

import "./forecast.css";

const Forecast = ({ forecast }) => {
  const { Date: date, Day, Temperature } = forecast;
  const { Maximum } = Temperature;

  const isCelsius = useSelector((state) => state.generalData.isCelsius);

  const iconSrc = require(`../../../assets/icons/${Day.Icon}.svg`).default;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //get the date by spliting it fron time by T
  const d = new Date(date.split("T"));
  const dayName = days[d.getDay()];

  const degreesF = parseInt(Maximum.Value);
  //convert fahrenheit to celsius
  const degreesC = parseInt((5 / 9) * (degreesF - 32));

  return (
    <div className="forecast">
      <div className="card">
        <div className="card-body">
          <img src={iconSrc} className="icon" />
          <h6 className="day-name">{dayName}</h6>
          {isCelsius ? (
            <h6>
              {degreesC} <RiCelsiusFill className="degreesFormat" />
            </h6>
          ) : (
            <h6>
              {degreesF} <RiFahrenheitFill className="degreesFormat" />
            </h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
