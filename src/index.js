// src/index.js
import "./styles.css";
import "./images/preview.png";
import getWeather from "./weatherAPI.js";
import getGif from "./giphyAPI.js";

const searchBox = document.querySelector(".search-box");
const searchBar = document.querySelector("#city");

const img = document.createElement(img);
const gifCard = document.querySelector(".gif-card");
gifCard.appendChild(img);

const wheatherCard = document.querySelector("weather-card");

searchBox.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = searchBar.value;
  if (!city) return;

  const weatherData = await getWeather(city);
  if (!weatherData) return;

  const gifData = await getGif(weatherData.icon);
  if (!gifData) return;

  img.src = gifData.url;
  img.alt = gifData.title;
});
