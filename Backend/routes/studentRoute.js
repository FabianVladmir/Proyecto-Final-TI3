import express from 'express';
import { signIn, profile, confirmAccount, authenticateStudent, forgetPassword, checkToken,
    newPassword, viewSchedules, viewEquipment, reserverEquipment
} from '../controllers/studentController.js';
import checkAuth from '../middleware/authMiddleware.js';


const router = express.Router();

// public routes
router.post("/", signIn);
router.get("/confirmar-cuenta/:token", confirmAccount);
router.post("/login", authenticateStudent);
router.post("/reset-password", forgetPassword);
router.route("/reset-password/:token").get(checkToken).post(newPassword);

router.get("/view-schedules/:type", viewSchedules);
router.get("/view-equipments/:type", viewEquipment);
// Agrega esta nueva ruta en tu archivo de rutas

router.get('/confirmacion-exitosa', (req, res) => {
    res.send(`
        <html>
        <head>
            <style>
                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
                .message-container {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="message-container">
                <h1>¡Tu cuenta ha sido confirmada exitosamente!</h1>
            </div>
        </body>
        </html>
    `);
});


// private routes
router.get("/profile", checkAuth, profile);
router.post("/reserver-equipments/:type/:idEquip", checkAuth, reserverEquipment);




export default router;