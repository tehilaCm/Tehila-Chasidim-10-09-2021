import React from "react";
import Forecast from "./forecast/Forecast";

import "./dailyForecasts.css";

const DailyForecasts = ({ forecasts }) => {
  return (
    <div className="daily-forecasts">
      {forecasts.map((forecast, index) => (
        <Forecast forecast={forecast} key={index} />
      ))}
    </div>
  );
};

export default DailyForecasts;
