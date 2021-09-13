export const getCity = async (city) => {
  const base =
    "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
  const query = `?apikey=${process.env.REACT_APP_API_KEY}&q=${city}`;

  try {
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentWeather = async (key) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${key}?apikey=${process.env.REACT_APP_API_KEY}`;

  try {
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
  } catch (error) {
    console.log(error);
  }
};

export const fiveDaysOfDailyForecasts = async (key) => {
  const base = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${key}?apikey=${process.env.REACT_APP_API_KEY}`;

  try {
    const response = await fetch(base + query);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const geoPositionSearch = async (latLon) => {
  const base =
    "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
  const query = `?apikey=${process.env.REACT_APP_API_KEY}&q=${latLon}`;
  try {
    const response = await fetch(base + query);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
