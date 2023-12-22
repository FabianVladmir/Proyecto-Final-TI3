import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';


const AgregarEquipos = () => {
    const [nuevoFormulario, setNuevoFormulario] = useState({
        nombre: '',
        componentes: '',
        cantidad: '',
    });

    const limpiarFormularioEquipos = () => {
        setNuevoFormulario({
            nombre: '',
            componentes: '',
            cantidad: '',
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
                        id="nombre"
                        name="nombre"
                        value={nuevoFormulario.nombre}
                        onChange={handleNuevoChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="componentes" className="block text-gray-700 font-bold mb-2">
                        Componentes
                    </label>
                    <textarea
                        id="componentes"
                        name="componentes"
                        value={nuevoFormulario.componentes}
                        onChange={handleNuevoChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cantidad" className="block text-gray-700 font-bold mb-2">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        value={nuevoFormulario.cantidad}
                        onChange={handleNuevoChange}
                        className="w-full p-2 border rounded"
                    />
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