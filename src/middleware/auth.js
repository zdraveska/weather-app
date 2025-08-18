import { JWT_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';
import APIError from '../errors/api-error.js';

const jwtErrorMap = {
  TokenExpiredError: { message: 'Token has expired', status: 403 },
  JsonWebTokenError: { message: 'Malformed or invalid token', status: 403 },
  NotBeforeError: { message: 'Token is not yet active', status: 403 }
};

const auth = (req, _res, next) => {
  try {
    const token = extractToken(req.headers.authorization);
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, username: payload.username };
    return next();
  } catch (err) {
    const error = jwtErrorMap[err.name] || { message: 'Authentication failed', status: 403 };
    return next(new APIError(error.message, error.status));
  }
};

function extractToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new APIError('No token provided', 403);
  }
  return authHeader.split(' ')[1];
}

export default auth;
