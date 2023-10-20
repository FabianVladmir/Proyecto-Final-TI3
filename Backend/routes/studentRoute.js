import express from 'express';
import { signIn, profile } from '../controllers/studentController.js';

const router = express.Router();

router.post("/", signIn);

router.get("/profile", profile);


export default router;