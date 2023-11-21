import API from "./config.js";

const getWeatherData = async (theNameOfTheCity) => {
  const url =
    "http://api.weatherapi.com/v1/forecast.json?key=" +
    API.key +
    "&q=" +
    theNameOfTheCity +
    "&days=7&aqi=no&alerts=no";
  console.log("We're being imported bro");
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default getWeatherData;
