console.log("Script is running");

// Import data from different files
import API from "./config.js";

// Getting elements
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

console.log(
  "Chosen array:",
  window.innerWidth < 600 ? "weekdays2" : "weekdays"
);

function getWeekdayArray() {
  return window.innerWidth < 600 ? weekdays2 : weekdays;
}

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

function clearContainer() {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
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

  const dayOfTheWeekIndex = (new Date().getDay() + isFirstCard) % 7;
  const dayOfTheWeekArray = getWeekdayArray();
  const dayOfTheWeek = dayOfTheWeekArray[dayOfTheWeekIndex];

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
      // Clear previous content in the container
      clearContainer();

      // Display the city and country
      const locationParagraph = document.createElement("p");
      locationParagraph.textContent = `${getData.location.name}, ${getData.location.country}`;
      cityNameContainer.appendChild(locationParagraph);

      // Create cards for each day (excluding the current day)
      for (let i = 0; i < 6; i++) {
        createWeatherCard(getData.forecast.forecastday[i], i === 0);
      }
    }
  } catch (error) {
    alert("Hey are you sure you are not holding up your map upside down?");
    console.error("Error fetching weather data bro:", error);
    // Handle the error, e.g., show an error message to the user.
  }
}

// Event listener for keyup event on the input field
inputField.addEventListener("keyup", function (event) {
  // Check if Enter key is pressed
  if (event.code === "Enter") {
    appWeather();
  }
});

// Event listener for click event on the button
button.addEventListener("click", appWeather);
