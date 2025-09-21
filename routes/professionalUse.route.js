import express from "express";

import {  getJoinFormById, getWaitingProfessionals, updateUserStatus } from '../controllers/professional.controller.js';

const router=express.Router();


router.get("/waiting", getWaitingProfessionals);


router.get("/joinforms/:id", getJoinFormById);

router.patch("/joinforms/:id/status", updateUserStatus);




export default router;