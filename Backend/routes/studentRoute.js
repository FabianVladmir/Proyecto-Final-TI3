import express from 'express';
import { signIn, profile, confirmAccount, authenticateStudent, forgetPassword, checkToken,
    newPassword, viewSchedules, viewEquipment, reserverEquipment
} from '../controllers/studentController.js';
import checkAuth from '../middleware/authMiddleware.js';


const router = express.Router();

// public routes
router.post("/", signIn);
router.get("/confirmAccount/:token", confirmAccount);
router.post("/login", authenticateStudent);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(checkToken).post(newPassword);

router.get("/view-schedules/:type", viewSchedules);
router.get("/view-equipments/:type", viewEquipment);

// private routes
router.get("/profile", checkAuth, profile);
router.post("/reserver-equipments/:type/:idEquip", checkAuth, reserverEquipment);




export default router;