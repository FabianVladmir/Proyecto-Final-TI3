import express from 'express';
import { requesEquipment, returnEquipment } from '../controllers/adminControllers.js';

const router = express.Router();

router.route("/").get(requesEquipment).post(returnEquipment);


export default router;