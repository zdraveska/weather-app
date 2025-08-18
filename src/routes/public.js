import express from 'express';
import { getDateTime } from '../controllers/datetime.controller.js';
import { sortStrings } from '../controllers/sort.controller.js';
import { login } from '../controllers/auth.controller.js';

const publicRoutes = express.Router();
publicRoutes.get('/datetime', getDateTime);
publicRoutes.post('/sort', sortStrings);
publicRoutes.post('/login', login);

export default publicRoutes;
