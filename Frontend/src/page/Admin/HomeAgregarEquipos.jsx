import React, { useState, useEffect } from 'react';
import Logo from '../../assets/ce-epcc.png';
import Equipo from 'flat-color-icons/svg/multiple_smartphones.svg';
import Libro from 'flat-color-icons/svg/reading.svg';
import ReactPaginate from 'react-paginate';

const styleLogo = {
    width: '70px', // Ajusta el ancho de la imagen
    height: '7  0px', // Ajusta la altura de la imagen
};

const infoContainerStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10vh',
    textAlign: 'center',
};

const cardStyles = {
    width: '600px', // Ancho personalizado
    height: '610px'
};

const heroStyles = {
    marginTop: '-72px', // Margen superior negativo para mover el hero hacia arriba
};

const AgregarForm = () => {
    const [weekRange, setWeekRange] = useState('');
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
    const [tipo, setTipo] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [showSelectionButtons, setShowSelectionButtons] = useState(true); // Variable de estado para mostrar/ocultar los botones

    useEffect(() => {
        const today = new Date();
        const firstDayOfWeek = new Date(today);
        const lastDayOfWeek = new Date(today);

        const currentDayOfWeek = today.getDay();
        firstDayOfWeek.setDate(today.getDate() - currentDayOfWeek + 1);
        lastDayOfWeek.setDate(today.getDate() + (7 - currentDayOfWeek));

        const startDate = `${firstDayOfWeek.getDate()}/${firstDayOfWeek.getMonth() + 1}/${today.getFullYear()}`;
        const endDate = `${lastDayOfWeek.getDate()}/${lastDayOfWeek.getMonth() + 1}/${today.getFullYear()}`;

        setWeekRange(`${startDate} al ${endDate}`);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prevFormulario) => ({
            ...prevFormulario,
            [name]: value,
        }));
    };

    const handleTipoChange = (tipoSeleccionado) => {
        setTipo(tipoSeleccionado);
        setMostrarFormulario(true);
        setShowSelectionButtons(false); // Ocultar los botones cuando se selecciona un tipo
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar acciones con los datos del formulario
        console.log(formulario);
    };


    const [nuevoFormulario, setNuevoFormulario] = useState({
        nombres: '',
        componentes: '',
        cantidad: '',
    });

    const handleNuevoChange = (e) => {
        const { name, value } = e.target;
        setNuevoFormulario((prevNuevoFormulario) => ({
            ...prevNuevoFormulario,
            [name]: value,
        }));
    };

    const handleNuevoSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar acciones con los datos del nuevo formulario
        console.log(nuevoFormulario);
    };

    const renderForm = () => {
        if (showSelectionButtons) {
            return (
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">Seleccione una categoria</h2>
                    <div className="flex mb-4" style={infoContainerStyles}>
                        <div>
                            <img src={Libro} alt="Ver equipos" />

                            <button
                                className={`w-full ${tipo === 'Libros' ? 'bg-blue-500' : 'bg-gray-300'} text-white py-2 px-4 rounded-md mb-2`}
                                onClick={() => handleTipoChange('Libros')}
                            >
                                Libros
                            </button>
                        </div>
                        <div>
                            <img src={Equipo} alt="Ver equipos" />
                            <button
                                className={`w-full ${tipo === 'Equipos' ? 'bg-blue-500' : 'bg-gray-300'} text-white py-2 px-4 rounded-md mb-2`}
                                onClick={() => handleTipoChange('Equipos')}
                            >
                                Equipos
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            if (tipo === 'Libros' && mostrarFormulario) {
                return (
                    <div>
                        <div className="hero min-h-screen bg-white rounded-lg shadow-lg" style={heroStyles}>
                            <div style={cardStyles}>
                                <div className="text-center lg:text-center">
                                    <a className="mx-auto flex items-center justify-center">
                                        <img src={Logo} alt="Logo" style={styleLogo} />
                                    </a>
                                </div>
                                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Agregar Libro</h2>

                                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 border rounded shadow">
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
                                                <option value="espanol">Español</option>
                                                <option value="ingles">Inglés</option>
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
                                                type="text"
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
                                                type="text"
                                                id="cantidad"
                                                name="cantidad"
                                                value={formulario.cantidad}
                                                onChange={handleChange}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex justify-start">
                                            <button
                                                onClick={() => setShowSelectionButtons(true)}
                                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                        <div className="flex justify-end">
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
                        </div>
                    </div>
                );
            } else if (tipo === 'Equipos' && mostrarFormulario) {
                return (
                    <div>
                        <div className="hero min-h-screen bg-white rounded-lg shadow-lg" style={heroStyles}>
                            <div style={cardStyles}>
                                <div className="text-center lg:text-center">
                                    <a className="mx-auto flex items-center justify-center">
                                        <img src={Logo} alt="Logo" style={styleLogo} />
                                    </a>
                                </div>
                                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Agregar Equipo</h2>
                                <form onSubmit={handleNuevoSubmit} className="max-w-lg mx-auto bg-white p-8 border rounded shadow">
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
                                            type="text"
                                            id="cantidad"
                                            name="cantidad"
                                            value={nuevoFormulario.cantidad}
                                            onChange={handleNuevoChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex justify-start">
                                            <button
                                                onClick={() => setShowSelectionButtons(true)}
                                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                        <div className="flex justify-end">
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
                        </div>
                    </div>
                );
            }
        }
    };

    return (
        <div>
            <div>
                {renderForm()}
            </div>
        </div>
    );
};

export default AgregarForm;
