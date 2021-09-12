import produce from "immer";
import handler from "./reducerUtils";

const initialState = {
  isCelsius: true,
};

const generalData = {
  toggleIsCelsius(state, action) {
    state.isCelsius = !state.isCelsius;
  },
};

const reducer = produce((state, action) => {
  handler(state, action, generalData);
}, initialState);

export default reducer;
