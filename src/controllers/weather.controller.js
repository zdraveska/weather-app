import dotenv from 'dotenv';
import APIError from '../errors/api-error.js';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../config.js';

dotenv.config();

export const getWeather = async (_req, res, next) => {
  const cities = ['Kyiv', 'Paris', 'Amsterdam', 'London', 'Rome'];
  const results = [];

  try {
    for (const city of cities) {
      try {
        const response = await fetch(
          `${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();

        if (!response.ok) {
          console.error(`Failed to fetch weather for ${city}:`, data.message);
          results.push({ city, error: data.message });
          continue;
        }

        results.push({
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          weather: data.weather[0].main,
          description: data.weather[0].description,
          humidity: data.main.humidity,
          wind_speed: data.wind.speed
        });
      } catch (err) {
        console.error(`Failed to fetch weather for ${city}:`, err.message);
        results.push({ city, error: err.message });
      }
    }

    res.json(results);
  } catch (err) {
    next(new APIError('Failed to fetch weather data', 500, err));
  }
};
