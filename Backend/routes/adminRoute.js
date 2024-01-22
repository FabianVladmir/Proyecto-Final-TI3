import express from 'express';
import { createItem, getAllItems, updateItemById, deleteItemById, getCategory, getItemById, getReservation, getStudentById, updateReservationStatus, getItemDetailsById} from '../controllers/adminControllers.js';

const router = express.Router();

// Crear un nuevo elemento
router.post("/create/:type", createItem);

// Obtener todos los elementos de un tipo
router.get("/get/:type", getAllItems);

// Obtener datos de un libro o equipo por ID
router.get("/get/:type/:itemId", getItemById);

// Actualizar un elemento por ID
router.put("/update/:type/:itemId", updateItemById);

// Eliminar un elemento por ID
router.delete("/delete/:type/:itemId", deleteItemById);


router.get("/getCategory", getCategory )

// Obtener todos los elementos de reservaciones
router.get("/getReservation/:type", getReservation);

// Obtener todos los elementos de reservaciones
router.get("/getStudent/:id", getStudentById);

// Actualizar el state de la reserva
router.post('/update-status/:type/:reservationId', updateReservationStatus);

// Obtener detalles de un libro o equipo por ID
router.get("/getDetails/:type/:itemId", getItemDetailsById);

export default router;
