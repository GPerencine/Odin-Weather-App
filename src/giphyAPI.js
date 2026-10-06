// src/giphyAPI.js
export default getGif;

const GIPHY_API_KEY = "dG3To2kSqydC7B5aIqQzwXpIMwORQzBb";

async function getGif(condition) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${condition}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data || Object.keys(data.data).length === 0) {
      throw new Error("No GIF found for this search!");
    }

    const gifData = {
      url: data.data.images.original.url,
      title: data.data.title,
      alt: data.data.title,
    };

    console.log(gifData);
    return gifData;
  } catch (error) {
    console.error(error);

    const gifData = {
      url: "",
      title: "Erro ao carregar GIF",
      alt: error.message,
    };

    console.log(gifData);
    return gifData;
  }
}
