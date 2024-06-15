import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// User signup route
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  // Hash the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create a new user instance
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // Save the new user to the database
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};

// User signin route
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    // Find user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Validate password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Exclude password from response
    const { password: pass, ...rest } = validUser._doc;

    // Set token as a cookie and respond with user data
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true, // Cookie accessible only via HTTP(S) protocol
      })
      .json(rest); // Send user data (excluding password) as JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};

// User logout route
export const logout = async (req, res, next) => {
  try {
    // Clear the access_token cookie and send logout success message
    res.clearCookie("access_token").json({ message: "Logout successful" });
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};
