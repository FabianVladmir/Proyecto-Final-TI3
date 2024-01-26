import express from 'express';
import { createItem, getAllItems, updateItemById, deleteItemById, getCategory, getItemById, 
    getReservation, getStudentById, updateReservation, getItemDetailsById, deleteReservation, updateCurrentTime, 
    updateReservationDevolution, getUserHistory} 
    from '../controllers/adminControllers.js';

    import checkAuth from '../middleware/authMiddleware.js';

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

// Obtener los datos del estudiante
router.get("/getStudent/:id", getStudentById);

// Actualizar el state de la reserva y amount si state es ACEPTADO
router.post('/update-reservation/:type/:reservationId', updateReservation);

// Ruta para eliminar reservas por ID y tipo (libro o equipo)
router.delete('/deleteReservationById/:type/:id', deleteReservation);

// Obtener detalles de un libro o equipo por ID
router.get("/getDetails/:type/:itemId", getItemDetailsById);

// Actualizar el currentTieme de las reservas y tambien el amount de los equipos o libros
router.put('/updateCurrentTime/:type/:id/:itemId', updateCurrentTime)


// Ruta para la actualización de reservas fecha y hora de entrega
router.put('/updateReservationDevolution/:type/:id', updateReservationDevolution);

// Ruta para obtener el historial de usuarios
router.get('/user-history', getUserHistory);


export default router;
