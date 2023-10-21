import express from 'express';
import { signIn, profile, confirmAccount } from '../controllers/studentController.js';

const router = express.Router();

router.post("/", signIn);
router.get("/profile", profile);
router.get("/confirmAccount/:token", confirmAccount)


export default router;