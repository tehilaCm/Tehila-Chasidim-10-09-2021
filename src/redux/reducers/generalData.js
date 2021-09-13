import produce from "immer";
import handler from "./reducerUtils";

//get theme from local storage so the value will not reset after refreshing the page
const getTheme = () => {
  const lightTheme = JSON.parse(localStorage.getItem("lightTheme"));
  if (lightTheme !== undefined) return lightTheme;
  else {
    localStorage.setItem("lightTheme", JSON.stringify(true));
    return true;
  }
};

const initialState = {
  isCelsius: true,
  isLight: getTheme(),
};

const generalData = {
  toggleIsCelsius(state, action) {
    state.isCelsius = !state.isCelsius;
  },
  toggleTheme(state, action) {
    localStorage.setItem("lightTheme", JSON.stringify(!state.isLight));
    state.isLight = !state.isLight;
    
    if (state.isLight === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  },
};

const reducer = produce((state, action) => {
  handler(state, action, generalData);
}, initialState);

export default reducer;
