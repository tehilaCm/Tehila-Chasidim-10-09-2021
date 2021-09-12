import { createStore, combineReducers } from "redux";

import generalData from "../reducers/generalData";

const reducer = combineReducers({ generalData });

const store = createStore(reducer);

export default store;
