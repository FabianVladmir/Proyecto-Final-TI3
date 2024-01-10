import Book from "../models/Book.js";
import Equipment from "../models/Equipment.js";

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

export { createItem, getAllItems, updateItemById, deleteItemById };
