// src/index.js
import "./styles.css";
import "./images/preview.png";
import getWeather from "./weatherAPI.js";
import getGif from "./giphyAPI.js";
import {
  renderWeatherCard,
  renderGifCard,
  renderError,
  renderLoading,
} from "./domUI.js";

const searchBox = document.querySelector(".search-box");
const searchBar = document.querySelector("#city");

searchBox.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = searchBar.value;
  if (!city) return;

  renderLoading();

  try {
    const weatherData = await getWeather(city);
    if (!weatherData) {
      throw new Error("City not found. Try again!");
    }

    const gifData = await getGif(weatherData.icon);
    if (!gifData) {
      throw new Error(`Não foi possível carregar o GIF.`);
    }

    renderWeatherCard(weatherData);
    renderGifCard(gifData);
  } catch (error) {
    console.error("Erro ao processar a busca:", error);
    renderError(error.message || "City not found. Try again!");
  }
});
