import express from 'express';
import { signIn, profile, confirmAccount, authenticateStudent } from '../controllers/studentController.js';
import checkAuth from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/", signIn);
router.get("/confirmAccount/:token", confirmAccount);
router.post("/login", authenticateStudent);

router.get("/profile", checkAuth, profile);
export default router;