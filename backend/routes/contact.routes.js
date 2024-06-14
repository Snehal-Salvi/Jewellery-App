import express from 'express';
import { sendQueryEmail } from '../controllers/email.controller.js';

const router = express.Router();

router.post('/', sendQueryEmail);  

export default router;
