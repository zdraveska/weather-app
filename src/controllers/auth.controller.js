import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const login = (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });

  const token = jwt.sign({ id: 1, username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};
