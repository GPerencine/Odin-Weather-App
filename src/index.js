// src/index.js
import "./styles.css";
import "./images/preview.png";
import getWeather from "./weatherAPI.js";
import getGif from "./giphyAPI.js";
import { renderWeatherCard, renderGifCard } from "./domUI.js";

const searchBox = document.querySelector(".search-box");
const searchBar = document.querySelector("#city");

searchBox.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = searchBar.value;
  if (!city) return;

  try {
    const weatherData = await getWeather(city);
    if (!weatherData) return;

    const gifData = await getGif(weatherData.icon);
    if (!gifData) return;

    renderWeatherCard(weatherData);
    renderGifCard(gifData);
  } catch (error) {
    console.error("Erro ao processar a busca:", error);
  }
});
