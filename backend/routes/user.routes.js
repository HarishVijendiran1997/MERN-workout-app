import express from 'express';
import { downgradeUser, loginUser, signupUser, upgradeUser } from '../controllers/user.controller.js';

const router = express.Router()

//routes for login
router.post('/login', loginUser)

//routes for signup
router.post('/signup', signupUser)

//routes for upgrading a user's account
router.patch('/upgrade/:id', upgradeUser)

//routes for downgrading a user's account
router.patch('/downgrade/:id', downgradeUser)
export default router