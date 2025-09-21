import express from "express";

import { SignUp, Login, Logout, getProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router=express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/logout",Logout)
router.get('/profile',protectRoute,getProfile)
// router.post("/Uprofile", protectRoute, updateProfile);

export default router;
