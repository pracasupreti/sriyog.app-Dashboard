import express from "express";

import { SignUp, Login, Logout, getProfile, refreshToken, verifyEmailLink, verifyEmail, forgetPassword, resetPassword} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router=express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/logout",Logout)
router.get('/profile',protectRoute,getProfile)
router.post('/refresh-token', refreshToken)
// router.post("/Uprofile", protectRoute, updateProfile);

router.get('/verify-emailLink',protectRoute,verifyEmailLink)
router.post('/verify-email',verifyEmail)
router.post('/forget-password',forgetPassword)
router.post('/reset-password/:token',resetPassword)

export default router;
