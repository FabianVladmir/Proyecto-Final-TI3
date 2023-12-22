import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';


const AgregarLibros = () => {
    const [formulario, setFormulario] = useState({
        titulo: '',
        editorial: '',
        autor: '',
        anio: '',
        edicion: '',
        cantidad: '',
        categoria: '',
        lenguaje: '',
    });
    const limpiarFormularioLibros = () => {
        setFormulario({
            titulo: '',
            editorial: '',
            autor: '',
            anio: '',
            edicion: '',
            cantidad: '',
            categoria: '',
            lenguaje: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prevFormulario) => ({
            ...prevFormulario,
            [name]: value,
        }));
    };

    const handleSubmitLibros = (e) => {
        e.preventDefault();

        const camposVacios = Object.entries(formulario).some(([key, value]) => value.trim() === '');

        if (camposVacios) {
            toast.error("Por favor, ingrese llene los campos", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        // Si no hay campos vacíos o faltan más de dos, mostrar éxito
        toast.success("¡Formulario enviado con éxito!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
        });

        console.log(formulario);
        setTimeout(limpiarFormularioLibros, 3000);
    };
    return (
        <div>
            <form onSubmit={handleSubmitLibros} className="max-w-lg mx-auto bg-white p-8 border rounded shadow">
                <div className="grid grid-cols-2 gap-4">

                    <div className="mb-4">
                        <label htmlFor="titulo" className="block text-gray-700 font-bold mb-2">
                            Título
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            value={formulario.titulo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categoria" className="block text-gray-700 font-bold mb-2">
                            Categoría
                        </label>
                        <select
                            id="categoria"
                            name="categoria"
                            value={formulario.categoria}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Selecciona una categoria</option>
                            <option value="espanol">Programacion</option>
                            <option value="ingles">Comunicacion</option>
                            {/* Agrega más opciones según tus necesidades */}
                        </select>
                    </div>

                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="editorial" className="block text-gray-700 font-bold mb-2">
                            Editorial
                        </label>
                        <input
                            type="text"
                            id="editorial"
                            name="editorial"
                            value={formulario.editorial}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lenguaje" className="block text-gray-700 font-bold mb-2">
                            Lenguaje
                        </label>
                        <select
                            id="lenguaje"
                            name="lenguaje"
                            value={formulario.lenguaje}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Selecciona un lenguaje</option>
                            <option value="espanol">ES</option>
                            <option value="ingles">EN</option>
                            {/* Agrega más opciones según tus necesidades */}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="autor" className="block text-gray-700 font-bold mb-2">
                            Autor
                        </label>
                        <input
                            type="text"
                            id="autor"
                            name="autor"
                            value={formulario.autor}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="anio" className="block text-gray-700 font-bold mb-2">
                            Año
                        </label>
                        <input
                            type="number"
                            id="anio"
                            name="anio"
                            value={formulario.anio}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="edicion" className="block text-gray-700 font-bold mb-2">
                            Edición
                        </label>
                        <input
                            type="text"
                            id="edicion"
                            name="edicion"
                            value={formulario.edicion}
                            onChange={handleChange}
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
                            value={formulario.cantidad}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
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
        </div>
    );
}

export default AgregarLibros;