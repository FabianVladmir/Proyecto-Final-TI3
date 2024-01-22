import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DetallesModal = ({ details, type, idReservation, onClose }) => {
    const [formulario, setFormulario] = useState({
        title: '',
        name: '',
        amount: '',
        state: '',
    });

    const [state, setState] = useState('');
    useEffect(() => {
        console.log('Valor de bookId:', details);
        const correctedType = type === 'book' ? 'books' : 'equipments';
        axios.get(`http://localhost:4000/api/admin/get/${correctedType}/${details}`)
            .then(response => {
                console.log('Datos del libro obtenidos:', response.data);
                setFormulario(response.data);
            })
            .catch(error => console.error('Error al obtener los datos del libro:', error));
    }, [details]);


    const handleChange = (e) => {
        const { value } = e.target;
        setState(value); // Actualiza el estado con el nuevo valor
    };


    const handleSubmitReservation = async (e) => {
        e.preventDefault();
        try {
            const correctedType = type === 'book' ? 'books' : 'equipments';
            const response = await axios.post(`http://localhost:4000/api/admin/update-status/${correctedType}/${idReservation}`, { reservationId: idReservation, newStatus: state });
            toast.success('Estado de la reserva actualizado con éxito', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000, // Duración en milisegundos
            });
            onClose(); // Cierra el modal después de la actualización
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error al actualizar el estado de la reserva:', error.response.data.msg);
        }
    };
    return (
        <div className="bg-white p-5 border rounded shadow">
            <h2 className="text text-center text-2xl font-bold">Detalles del Equipo</h2>
            <div className="grid">
                <div className="mb-2">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Nombre de la Categoria
                    </label>
                    {type === 'book' ? (
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formulario.title}
                            className="w-full bg-gray-200 text-gray-700 p-2 rounded cursor-not-allowed"
                            readOnly
                        />) : (
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formulario.name}
                            className="w-full bg-gray-200 text-gray-700 p-2 rounded cursor-not-allowed"
                            readOnly
                        />)
                    }
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="mb-2">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formulario.amount}
                        className="w-full bg-gray-200 text-gray-700 p-2 rounded cursor-not-allowed"
                        readOnly
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="year" className="block text-gray-700 font-bold mb-2">
                        Estado
                    </label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formulario.state}
                        className="w-full bg-gray-200 text-gray-700 p-2 rounded cursor-not-allowed"
                        readOnly
                    />
                </div>
            </div>
            <h2 className="text text-center text-2xl font-bold">Detalles de la Reserva</h2>
            <form onSubmit={handleSubmitReservation} className="max-w-lg mx-auto bg-white p-5 border rounded shadow">
                <div className="grid">
                    <div className="mb-2">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                            Cambiar estado de la Reserva
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={state}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="ACEPTADO">ACEPTADO</option>
                            <option value="RECHAZADO">RECHAZADO</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Actualizar
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={onClose}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default DetallesModal;
