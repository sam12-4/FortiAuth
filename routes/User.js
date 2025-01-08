import express from 'express';
import { SignUser, getMyProfile, logoutUser, registerUser } from '../controllers/user.js';
import { isAutheticated } from '../middlewares/Auth.js';


const router = express.Router();

router.post('/signIn', SignUser);
router.post('/register',registerUser);
// router.get("/profile", isAutheticated, getMyProfile);
router.get("/logout", isAutheticated, logoutUser);

export default router;