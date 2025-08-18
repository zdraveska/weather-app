import express from 'express';
import auth from '../middleware/auth.js';
import { getWeather } from '../controllers/weather.controller.js';

const privateRoutes = express.Router();

privateRoutes.use(auth);

privateRoutes.get('/weather', getWeather);

export default privateRoutes;
