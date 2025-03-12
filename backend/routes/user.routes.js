import express from 'express';
import { loginUser, signupUser, upgradeUser } from '../controllers/user.controller.js';

const router = express.Router()

//routes for login
router.post('/login', loginUser)

//routes for signup
router.post('/signup', signupUser)

//routes for upgrading a user's account
router.patch('/upgrade/:id', upgradeUser)

export default router