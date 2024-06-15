import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.access_token;

  // If token is missing, return an error
  if (!token) {
    return next(errorHandler(403, "Access denied, token missing!"));
  }

  try {
    // Verify the token using the JWT_SECRET from environment variables
    const data = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user ID from the token to the request object for future middleware or routes to use
    req.userId = data.id;
    
    // Call next to pass control to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails (expired, invalid, etc.), return an error
    return next(errorHandler(403, "Invalid token"));
  }
};
