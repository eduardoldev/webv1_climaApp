import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const weatherapi_api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export const getWeather = async (city: string) => {
  try {
    const response = await weatherapi_api.get("weather", {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "pt_br",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
