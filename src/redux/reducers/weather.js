import produce from "immer";
import handler from "./reducerUtils";

const initialState = {
  currentWeather: null,
  forecasts: null,
  city: null,
};

const weather = {
  setCurrentWeather(state, action) {
    state.currentWeather = action.payload;
  },
  setForecasts(state, action) {
    state.forecasts = action.payload;
  },
  setCity(state, action) {
    state.city = action.payload;
  },
};

const reducer = produce((state, action) => {
  handler(state, action, weather);
}, initialState);

export default reducer;
