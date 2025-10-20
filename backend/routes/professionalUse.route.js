import express from "express";

import {  getJoinFormById, getProfessionalsFilters, getWaitingProfessionals, getWaitingProfessionalsKPIs, updateUserStatus } from '../controllers/professional.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";

const router=express.Router();


router.get("/waiting", protectRoute, getWaitingProfessionals);

router.get("/filters", protectRoute, getProfessionalsFilters);


router.get("/joinforms/:id", getJoinFormById);

router.patch("/joinforms/:id/status", updateUserStatus);

router.get("/waiting-professionals/kpis", getWaitingProfessionalsKPIs);




export default router;