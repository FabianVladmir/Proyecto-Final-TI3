import React, { useState } from 'react';

const formatDate = (dateString) => {
    // Verificar si dateString es un valor válido
    if (!dateString || isNaN(new Date(dateString).getTime())) {
        return '';  // Devolver una cadena vacía o algún valor predeterminado si no es válido
    }

    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
};

const ModalEditar = ({ item, onClose  }) => {
    const [formData, setFormData] = useState({
        returnDate: formatDate(item.returnDate),
        reservationDateTime: formatDate(item.reservationDateTime)
    });

    const handleBook = (e) => {
        e.preventDefault();
        // Realizar acciones necesarias para la reserva de libros con formData.returnDate
    };

    const handleChangeBook = (e) => {
        setFormData({ ...formData, returnDate: e.target.value });
    };

    const handleEquipment = (e) => {
        e.preventDefault();
        // Realizar acciones necesarias para la reserva de equipos con formData.reservationDateTime y formData.endHour
    };

    const handleChangeEquipment = (e) => {
        setFormData({ ...formData, reservationDateTime: e.target.value });

    };

    return (
        <div className="max-w-lg mx-auto bg-white p-5 border rounded shadow">
            {item.type === 'book' ? (
                <form onSubmit={handleBook}>
                    <div className="mb-4 block text-gray-700 font-bold">
                        <h5>Actualizar Fecha de Reserva de Libros</h5>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="returnDate" className="block text-gray-700 font-bold mb-2">
                            Cambiar fecha de entrega
                        </label>
                        <input
                            type="date"
                            id="returnDate"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChangeBook}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Actualizar
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <button className="modal-close text-white bg-red-500 p-2 rounded" onClick={onClose}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleEquipment}>
                    <div className="mb-4 block text-gray-700 font-bold">
                        <h5>Actualizar Fecha y Hora del Reserva de Equipos</h5>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="reservationDateTime" className="block text-gray-700 font-bold mb-2">
                            Cambiar fecha de entrega
                        </label>
                        <input
                            type="date"
                            id="reservationDateTime"
                            name="reservationDateTime"
                            value={formData.reservationDateTime}
                            onChange={handleChangeEquipment}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endHour" className="block text-gray-700 font-bold mb-2">
                            Cambiar hora de entrega
                        </label>
                        <input
                            type="time"
                            id="endHour"
                            name="endHour"
                            value={item.endHour || ''}
                            onChange={handleChangeEquipment}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Actualizar
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <button className="modal-close text-white bg-red-500 p-2 rounded" onClick={onClose}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ModalEditar;
