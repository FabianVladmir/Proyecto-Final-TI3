import Book from "../models/Book.js";
import Equipment from "../models/Equipment.js";
import ReservationBooks from '../models/ReservationBooks.js';
import ReservationEquipments from '../models/ReservationEquipment.js';
import Student from '../models/Student.js';

const VALID_TYPES = ['books', 'equipments'];

const createItem = async (req, res) => {
    const { type } = req.params;

    if (!type || !VALID_TYPES.includes(type)) {
        const error = new Error("Tipo de categoría no válido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        if (type === "books") {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        } else if (type === "equipments") {
            const newEquipment = new Equipment(req.body);
            const savedEquipment = await newEquipment.save();
            res.status(201).json(savedEquipment);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el item" });
    }
};

const getAllItems = async (req, res) => {
    const { type } = req.params;

    if (!type || !VALID_TYPES.includes(type)) {
        const error = new Error("Tipo de categoría no válido");
        return res.status(400).json({ msg: error.message });
    }
    try {
        let collection;
        if (type === "books") {
            collection = await Book.find();
        } else if (type === "equipments") {
            collection = await Equipment.find();
        }
        res.json(collection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los items" });
    }
};

const updateItemById = async (req, res) => {
    const { type, itemId } = req.params;

    if (!type || !VALID_TYPES.includes(type)) {
        const error = new Error("Tipo de categoría no válido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        let updatedItem;
        if (type === "books") {
            updatedItem = await Book.findByIdAndUpdate(itemId, req.body, { new: true });
        } else if (type === "equipments") {
            updatedItem = await Equipment.findByIdAndUpdate(itemId, req.body, { new: true });
        }

        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el item" });
    }
};

const deleteItemById = async (req, res) => {
    const { type, itemId } = req.params;

    if (!type || !VALID_TYPES.includes(type)) {
        const error = new Error("Tipo de categoría no válido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        if (type === "books") {
            await Book.findByIdAndDelete(itemId);
        } else if (type === "equipments") {
            await Equipment.findByIdAndDelete(itemId);
        }

        res.json({ message: "Item eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el item" });
    }
};

const getCategory = async (req, res) => {
    try {
        const categories = await Book.distinct("category");
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las categorías de libros" });
    }
};


const getItemById = async (req, res) => {
    const { type, itemId } = req.params;

    if (!type || !VALID_TYPES.includes(type)) {
        const error = new Error("Tipo de categoría no válido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        let item;
        if (type === "books") {
            // Reemplaza 'Book' con el nombre real de tu modelo de libro
            item = await Book.findById(itemId);
        } else if (type === "equipments") {
            // Reemplaza 'Equipment' con el nombre real de tu modelo de equipo
            item = await Equipment.findById(itemId);
        }

        if (!item) {
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los datos del elemento por ID' });
    }
};

const getReservation = async (req, res) => {
    const { type } = req.params;

    if (!type || !VALID_TYPES.includes(type)) {
        const error = new Error("Tipo de categoría no válido");
        return res.status(400).json({ msg: error.message });
    }
    try {
        let collection;
        if (type === "books") {
            collection = await ReservationBooks.find();
        } else if (type === "equipments") {
            collection = await ReservationEquipments.find();
        }
        res.json(collection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las reservaciones" });
    }
};

const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        // Busca al estudiante por ID en la base de datos
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        // Retorna los datos del estudiante
        res.json(student);
    } catch (error) {
        console.error('Error al obtener los datos del estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateReservation = async (req, res) => {
    const { reservationId, newStatus } = req.body;
    const { type } = req.params;

    if (!type || !VALID_TYPES.includes(type)) {
        const error = new Error("Tipo de categoría no válido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        let reservation;

        if (type === "books") {
            // Buscar la reserva de libro por ID
            reservation = await ReservationBooks.findById(reservationId);
        } else if (type === "equipments") {
            // Buscar la reserva de equipo por ID
            reservation = await ReservationEquipments.findById(reservationId);
        } else {
            return res.status(400).json({ msg: 'Tipo de reserva no válido' });
        }

        if (!reservation) {
            return res.status(404).json({ msg: 'Reserva no encontrada' });
        }

        // Actualizar el estado
        reservation.state = newStatus;

        if (newStatus === 'ACEPTADO') {
            // Reducir la cantidad en uno si el estado es "ACEPTADO"
            const itemType = type === 'books' ? Book : Equipment;

            // Obtener el ID del libro o equipo según el tipo de reserva
            const itemId = type === 'books' ? reservation.bookId : reservation.equipmentId;

            // Actualizar la cantidad en el modelo correspondiente
            await itemType.findByIdAndUpdate(itemId, { $inc: { amount: -1 } });
        }
        if (newStatus === 'RECHAZADO') {
            // Programar la eliminación después de 1 hora
            const scheduledDeletionTime = new Date();
            scheduledDeletionTime.setSeconds(scheduledDeletionTime.getSeconds() + 30);
            //scheduledDeletionTime.setHours(scheduledDeletionTime.getHours() + 1);

            reservation.deleteScheduled = scheduledDeletionTime;
            await reservation.save();
        }

        if (newStatus === 'ACEPTADO' || newStatus === 'PENDIENTE') {
            if (reservation.deleteScheduled) {
                clearTimeout(reservation.deleteScheduled);
                reservation.deleteScheduled = null;
            }
        }

        // Guardar los cambios en la reserva
        await reservation.save();

        res.json({ msg: 'Estado de la reserva actualizado con éxito y cantidad reducida si es necesario' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar la reserva' });
    }
};


const getItemDetailsById = async (req, res) => {
    const { type, itemId } = req.params;

    if (!type || !VALID_TYPES.includes(type)) {
        const error = new Error("Tipo de categoría no válido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        let item;
        if (type === "books") {
            item = await Book.findById(itemId);
        } else if (type === "equipments") {
            item = await Equipment.findById(itemId);
        }

        if (!item) {
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles del elemento por ID' });
    }
};


const deleteReservation = async (req, res) => {
    console.log('Botón de clic ejecutado');
    try {
        const { type, id } = req.params;

        // Determinar el modelo de reserva según el tipo (libro o equipo)
        const ReservationModel = type === 'book' ? ReservationBooks : ReservationEquipments;

        // Eliminar la reserva por ID
        const deletedReservation = await ReservationModel.findByIdAndDelete(id);

        if (!deletedReservation) {
            return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
        }

        return res.status(200).json({ success: true, message: 'Reserva eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

const updateCurrentTime = async (req, res) => {
    try {
        const { type, id, itemId } = req.params;

        // Determinar el modelo de reserva según el tipo (libro o equipo)
        const ReservationModel = type === 'book' ? ReservationBooks : ReservationEquipments;

        // Actualizar el currentTime por ID
        const updatedReservation = await ReservationModel.findByIdAndUpdate(
            id,
            { currentTime: new Date() },
            { new: true }
        );

        if (type === 'book') {
            await Book.findByIdAndUpdate(itemId, { $inc: { amount: 1 } });
        } else if (type === 'equipment') {
            await Equipment.findByIdAndUpdate(itemId, { $inc: { amount: 1 } });
        }

        if (!updatedReservation) {
            return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
        }

        return res.status(200).json({ success: true, message: 'currentTime actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar currentTime:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
};

export {
    createItem,
    getAllItems,
    updateItemById,
    deleteItemById,
    getCategory,
    getItemById,
    getReservation,
    getStudentById,
    updateReservation,
    getItemDetailsById,
    deleteReservation,
    updateCurrentTime
};
