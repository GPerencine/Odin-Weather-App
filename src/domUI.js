//src/domUI.js
export { renderWeatherCard, renderGifCard };

const gifCard = document.querySelector(".gif-card");
const weatherCard = document.querySelector(".weather-card");

const tempIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M338.5-138.5Q280-197 280-280q0-48 21-89.5t59-70.5v-320q0-50 35-85t85-35q50 0 85 35t35 85v320q38 29 59 70.5t21 89.5q0 83-58.5 141.5T480-80q-83 0-141.5-58.5ZM440-520h80v-40h-40v-40h40v-80h-40v-40h40v-40q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240Z"/></svg>`;

const weatherIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M224.5-214.5Q210-229 210-250t14.5-35.5Q239-300 260-300t35.5 14.5Q310-271 310-250t-14.5 35.5Q281-200 260-200t-35.5-14.5Zm120 120Q330-109 330-130t14.5-35.5Q359-180 380-180t35.5 14.5Q430-151 430-130t-14.5 35.5Q401-80 380-80t-35.5-14.5Zm120-120Q450-229 450-250t14.5-35.5Q479-300 500-300t35.5 14.5Q550-271 550-250t-14.5 35.5Q521-200 500-200t-35.5-14.5Zm240 0Q690-229 690-250t14.5-35.5Q719-300 740-300t35.5 14.5Q790-271 790-250t-14.5 35.5Q761-200 740-200t-35.5-14.5Zm-120 120Q570-109 570-130t14.5-35.5Q599-180 620-180t35.5 14.5Q670-151 670-130t-14.5 35.5Q641-80 620-80t-35.5-14.5ZM300-360q-91 0-155.5-64.5T80-580q0-83 55-145t136-73q32-57 87.5-89.5T480-920q90 0 156.5 57.5T717-719q69 6 116 57t47 122q0 75-52.5 127.5T700-360H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-744l-10 24h-25q-57 2-97.5 42.5T160-580q0 58 41 99t99 41Zm180-100Z"/></svg>`;

const timeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>`;

function renderWeatherCard(weatherData) {
  weatherCard.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = weatherData.city;

  const temp = document.createElement("p");
  temp.classList.add("info-item");
  temp.innerHTML = `${tempIcon} <span>Temperature: ${weatherData.temperature} °C</span>`;

  const condition = document.createElement("p");
  condition.classList.add("info-item");
  condition.innerHTML = `${weatherIcon} <span>Weather: ${weatherData.condition}</span>`;

  const time = document.createElement("p");
  time.classList.add("info-item");
  time.innerHTML = `${timeIcon} <span>Local Time: ${weatherData.dateTime}</span>`;

  weatherCard.append(title, temp, condition, time);
}

function renderGifCard(gifData) {
  gifCard.innerHTML = "";

  const img = document.createElement("img");
  img.src = gifData.url;
  img.alt = gifData.title;

  gifCard.appendChild(img);
}
