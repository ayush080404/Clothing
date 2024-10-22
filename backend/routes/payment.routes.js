import express from "express";
import { createOrder } from "../controller/payment.controller.js";

const router = express.Router();

router.post("/createOrder", createOrder);

export default router;
