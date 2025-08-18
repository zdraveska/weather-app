import dotenv from 'dotenv';
import APIError from './errors/api-error.js';

dotenv.config();

const requiredVars = ['JWT_SECRET', 'WEATHER_API_KEY', 'WEATHER_API_URL'];
const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  throw new APIError(`Missing environment variables: ${missingVars.join(', ')}`, 500);
}

export const PORT = parseInt(process.env.PORT, 10) || 3000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
export const WEATHER_API_URL = process.env.WEATHER_API_URL;
