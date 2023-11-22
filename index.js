import API from "./config.js";
import getWeatherData from "./api.js";
import { appWeather } from "./app.js";

const button = document.querySelector("#submit-search");
const cityNameContainer = document.querySelector(".city-info");
const inputField = document.querySelector("#cityName");
const container = document.querySelector(".container");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function createWeatherCard(dayData, isFirstCard) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (isFirstCard) {
    card.classList.add("main-card");
  }

  const imageBox = document.createElement("div");
  imageBox.classList.add("imgBx");
  card.appendChild(imageBox);

  const cardImg = document.createElement("img");
  cardImg.src = dayData.day.condition.icon;
  cardImg.alt = `Icon matchin the weather: ${dayData.day.condition.text}`;
  imageBox.appendChild(cardImg);

  const contentBox = document.createElement("div");
  contentBox.classList.add("contentBx");
  card.appendChild(contentBox);

  const dayOfTheWeek =
    weekdays[(new Date(dayData.date).getDay() + isFirstCard) % 7];

  const cardHeader = document.createElement("h2");
  cardHeader.innerHTML = dayOfTheWeek;
  contentBox.appendChild(cardHeader);

  const tempDescription = document.createElement("h4");
  tempDescription.innerHTML = dayData.day.condition.text; // Fix here
  contentBox.appendChild(tempDescription);

  const currentTempBox = document.createElement("div");
  currentTempBox.classList.add("color");
  contentBox.appendChild(currentTempBox);

  const currentTempHeader = document.createElement("h3");
  currentTempHeader.innerHTML = "Temp:";
  currentTempBox.appendChild(currentTempHeader);

  const currentTemp = document.createElement("span");
  currentTemp.classList.add("current-temp");
  currentTemp.innerHTML = `${dayData.day.avgtemp_c}°C`;
  currentTempBox.appendChild(currentTemp);

  const minMaxTemperatures = document.createElement("div");
  minMaxTemperatures.classList.add("details");
  contentBox.appendChild(minMaxTemperatures);

  const minMaxTempHeader = document.createElement("h3");
  minMaxTempHeader.innerHTML = "More:";
  minMaxTemperatures.appendChild(minMaxTempHeader);

  const minTemp = document.createElement("span");
  minTemp.classList.add("min-temp");
  minTemp.innerHTML = `Min: ${dayData.day.mintemp_c}°C`;
  minMaxTemperatures.appendChild(minTemp);

  const maxTemp = document.createElement("span");
  maxTemp.classList.add("max-temp");
  maxTemp.innerHTML = `Max: ${dayData.day.maxtemp_c}°C`;
  minMaxTemperatures.appendChild(maxTemp);

  container.appendChild(card);
}

inputField.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    appWeather();
  }
});

button.addEventListener("click", appWeather);

export default createWeatherCard;
