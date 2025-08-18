import express from 'express';
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import errorHandler from './middleware/error-handler.js';
import { PORT } from './config.js';
import APIError from './errors/api-error.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use('/api/public', publicRoutes);
app.use('/api/private', privateRoutes);

app.use((req, res, next) => {
  next(new APIError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
