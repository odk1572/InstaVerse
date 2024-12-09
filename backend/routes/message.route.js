import express from "express";
import verifyjwt from "../middlewares/verifyjwt.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();
router.route('/send/:id').post(verifyjwt,sendMessage);
router.route('/all/:id').get(verifyjwt,getMessage);

export default router;
