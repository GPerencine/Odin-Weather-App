// src/weatherAPI.js
export default getWeather;

const WEATHER_API_KEY = "MPMMGXY6PSNNS86THMRBUMGR6";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${WEATHER_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();

    const weatherData = {
      city: data.resolvedAddress,
      temperature: data.currentConditions.temp,
      condition: data.currentConditions.conditions,
      dateTime: data.currentConditions.datetime,
      icon: data.currentConditions.icon,
    };

    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error("Erro ao buscar o clima:", error);
  }
}
