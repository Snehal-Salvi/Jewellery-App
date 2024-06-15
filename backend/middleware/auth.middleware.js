 
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(403, 'Access denied, token missing!'));
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id; // Attach user ID to request for further processing
    next();
  } catch (error) {
    return next(errorHandler(403, 'Invalid token'));
  }
};
