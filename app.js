import getWeatherData from "./api.js";
import createWeatherCard from "./index.js";

const inputField = document.querySelector("#cityName");
const cityNameContainer = document.querySelector(".city-info");
const container = document.querySelector(".container");

const appWeather = async () => {
  const theNameOfTheCity = inputField.value.trim();

  try {
    const getData = await getWeatherData(theNameOfTheCity);
    console.log("Get all the data", getData);

    if (theNameOfTheCity) {
      container.innerHTML = "";
      cityNameContainer.innerHTML = "";

      const locationParagraph = document.createElement("p");
      locationParagraph.textContent = `${getData.location.name}, ${getData.location.country}`;
      cityNameContainer.appendChild(locationParagraph);

      for (let i = 0; i < 7; i++) {
        createWeatherCard(getData.forecast.forecastday[i], i === 0);
      }
    }
  } catch (error) {
    alert("Something is wrong read your console errors bro");
    console.error("Error fetching weather data :", error);
  }
};

export default appWeather;
