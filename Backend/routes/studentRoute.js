import express from 'express';
import { signIn, profile, confirmAccount, authenticateStudent } from '../controllers/studentController.js';

const router = express.Router();

router.post("/", signIn);
router.get("/profile", profile);
router.get("/confirmAccount/:token", confirmAccount);
router.post("/login", authenticateStudent);


export default router;