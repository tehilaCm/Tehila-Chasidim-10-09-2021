import { createStore, combineReducers } from "redux";

import generalData from "../reducers/generalData";
import weather from "../reducers/weather";

const reducer = combineReducers({ generalData, weather });

const store = createStore(reducer);

export default store;
