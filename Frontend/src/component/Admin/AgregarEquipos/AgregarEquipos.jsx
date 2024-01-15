import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';


const AgregarEquipos = () => {
    const [nuevoFormulario, setNuevoFormulario] = useState({
        name: '',
        components: '',
        amount: '',
        state: ''
    });

    const limpiarFormularioEquipos = () => {
        setNuevoFormulario({
            name: '',
            components: '',
            amount: '',
            state: '',
        });
    };

    const handleNuevoChange = (e) => {
        const { name, value } = e.target;
        setNuevoFormulario((prevNuevoFormulario) => ({
            ...prevNuevoFormulario,
            [name]: value,
        }));
    };

    const handleSubmitEquipos = (e) => {
        e.preventDefault();

        const camposVacios = Object.entries(nuevoFormulario).some(([key, value]) => value.trim() === '');

        if (camposVacios) {
            toast.error("Por favor, ingrese llene los campos", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        toast.success("¡Formulario enviado con éxito!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
        });

        console.log(nuevoFormulario);
        setTimeout(limpiarFormularioEquipos, 3000);
    };

    return (
        <>
            <form onSubmit={handleSubmitEquipos} className="max-w-lg mx-auto bg-white p-8 border rounded shadow">
                <div className="mb-4">
                    <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={nuevoFormulario.name}
                        onChange={handleNuevoChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="components" className="block text-gray-700 font-bold mb-2">
                        Componentes
                    </label>
                    <textarea
                        id="components"
                        name="components"
                        value={nuevoFormulario.components}
                        onChange={handleNuevoChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={nuevoFormulario.amount}
                        onChange={handleNuevoChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-2">
                        <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
                            Estado
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={nuevoFormulario.state}
                            onChange={handleNuevoChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Seleccione un Estado</option>
                            <option value="DISPONIBLE">DISPONIBLE</option>
                            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                        </select>
                    </div>

                <div className="flex justify-center">
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default AgregarEquipos;