import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsMoon, BsSun } from "react-icons/bs";

import actions from "../../redux/actions";
import "./themeBtn.css";

//This component allows the user to choose light or dark theme for the website
const ThemeBtn = () => {
  const isLightTheme = useSelector((state) => state.generalData.isLight);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(actions.toggleTheme());
  };
  return (
    <div className="theme">
      <button
        onClick={toggleTheme}
        className={
          isLightTheme ? "theme-btn dark-theme" : "theme-btn light-theme"
        }
      >
        {isLightTheme ? (
          <BsMoon className="dark-theme-icon" />
        ) : (
          <BsSun className="light-theme-icon" />
        )}
      </button>
    </div>
  );
};

export default ThemeBtn;
