import express from 'express';

import { signin, signup, logout } from '../controllers/auth.controller.js';

const router = express.Router(); 

// Routes for user authentication
router.post('/signup', signup); // Route for user signup
router.post('/signin', signin); // Route for user signin
router.post('/logout', logout); // Route for user logout

export default router;  
