import API from "./config.js";

const button = document.querySelector("#submit-search");
const inputField = document.querySelector("#cityName");
const cityNameContainer = document.querySelector(".city-info");
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

const weekdays2 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

console.log("Inside appWeather function");

async function getWeatherData(theNameOfTheCity) {
  const url =
    "http://api.weatherapi.com/v1/forecast.json?key=" +
    API.key +
    "&q=" +
    theNameOfTheCity +
    "&days=7&aqi=no&alerts=no";

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

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
    weekdays2[(new Date(dayData.date).getDay() + isFirstCard) % 7];

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

  // Append the card to the container
  container.appendChild(card);
}

async function appWeather() {
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
}

inputField.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    appWeather();
  }
});

button.addEventListener("click", appWeather);
