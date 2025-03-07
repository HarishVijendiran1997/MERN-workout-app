import express from 'express';
import { loginUser, signupUser } from '../controllers/user.controller.js';

const router = express.Router()

//routes for login
router.post('/login', loginUser)

//routes for signup
router.post('/signup', signupUser)

export default router