import dotenv from 'dotenv';
import APIError from '../errors/api-error.js';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../config.js';

dotenv.config();

export const getWeather = async (req, res, next) => {
  const cities = ['Kyiv', 'Paris', 'Amsterdam', 'London', 'Rome'];

  try {
    const requests = cities.map((city) =>
      fetch(`${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
    );

    const responses = await Promise.allSettled(requests);

    const results = await Promise.all(
      responses.map(async (r, i) => {
        if (r.status === 'fulfilled') {
          const response = r.value;
          const data = await response.json();

          if (!response.ok) {
            console.error(`Failed to fetch weather for ${cities[i]}:`, data.message);
            return { city: cities[i], error: data.message };
          }

          return {
            city: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            weather: data.weather[0].main,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed
          };
        } else {
          console.error(`Failed to fetch weather for ${cities[i]}:`, r.reason.message);
          return { city: cities[i], error: r.reason.message };
        }
      })
    );

    res.json(results);
  } catch (err) {
    next(new APIError('Failed to fetch weather data', 500, err));
  }
};
