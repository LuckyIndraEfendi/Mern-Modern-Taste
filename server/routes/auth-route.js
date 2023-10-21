import express from "express";
import { login, signUp } from "../controllers/auth-controler.js";
const router = express.Router();

router.post("/sign-in", login);
router.post("/sign-up", signUp);

export default router;
