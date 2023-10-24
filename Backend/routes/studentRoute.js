import express from 'express';
import { signIn, profile, confirmAccount, authenticateStudent, forgetPassword, checkToken,
    newPassword } 
    from '../controllers/studentController.js';
import checkAuth from '../middleware/authMiddleware.js';


const router = express.Router();

// public routes
router.post("/", signIn);
router.get("/confirmAccount/:token", confirmAccount);
router.post("/login", authenticateStudent);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(checkToken).post(newPassword);



// private routes
router.get("/profile", checkAuth, profile);




export default router;