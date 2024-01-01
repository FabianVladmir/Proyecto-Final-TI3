import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../../page/Cliente/styles/HomeReservar.module.css';
import { toast } from 'react-toastify';

const VerLibros = () => {
    const [formDataLibros, setFormDataLibros] = useState({
        fechaInicio: '',
        fechaFin: '',
    });

    const [selectedRow, setSelectedRow] = useState(null);

    const limpiarFormularioLibros = () => {
        setFormDataLibros({
            fechaInicio: '',
            fechaFin: '',
        });
        setSelectedRow(null);
    };

    const handleChangeLibros = (e) => {
        const { name, value } = e.target;
        setFormDataLibros({
            ...formDataLibros,
            [name]: value,
        });
    };

    const handleRowSelection = (libro) => {
        setSelectedRow((prevSelectedRow) =>
            prevSelectedRow && prevSelectedRow.titulo === libro.titulo ? null : libro
        );
    };

    const handleSubmitLibros = (e) => {
        e.preventDefault();

        const camposVacios = Object.entries(formDataLibros).some(([key, value]) => value.trim() === '');

        if (camposVacios || !selectedRow) {
            toast.error("Por favor, ingrese y seleccione todos los campos", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        const reservaData = {
            titulo: selectedRow.titulo,
            año: selectedRow.año,
            categoria: selectedRow.categoria,
            autores: selectedRow.autores,
            lenguaje: selectedRow.lenguaje,
            fechaInicio: formDataLibros.fechaInicio,
            fechaFin: formDataLibros.fechaFin,
        };

        toast.success("¡Libro reservado con éxito!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
        });

        setTimeout(() => {
            limpiarFormularioLibros();
            setSelectedRow(null);
        }, 3000);

        console.log(reservaData);
    };

    const libroData = [
        {
            titulo: 'Libro 1',
            año: 'Componente 1, Componente 2',
            categoria: 'Programacion',
            autores: 'Luis y Fabian',
            lenguaje: 'ES'
        },
        {
            titulo: 'Libro 2',
            año: 'Componente 1, Componente 2',
            categoria: 'Robotica',
            autores: 'Arturo y Maria',
            lenguaje: 'EN'
        },
        // Agrega más datos de libros según sea necesario
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [searchTermLibros, setSearchTermLibros] = useState('');
    const [searchResultsLibros, setSearchResultsLibros] = useState([]);

    const handleSearchLibros = (searchTermLibros) => {
        const filteredResults = libroData.filter((libro) => {
            return (
                libro.titulo.toLowerCase().includes(searchTermLibros.toLowerCase()) ||
                libro.categoria.toLowerCase().includes(searchTermLibros.toLowerCase())
            );
        });
        setSearchResultsLibros(filteredResults);
    };

    return (
        <>
            <form onSubmit={handleSubmitLibros} className="grid grid-cols-2 gap-1">
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg" style={{ maxWidth: '900px' }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre titulo del Libro o categoria"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
                            value={searchTermLibros}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchTermLibros(value);
                                handleSearchLibros(value);
                            }}
                        />
                    </div>

                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Libros Disponibles</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto" style={{ width: '100%', border: '1px solid #000' }}>
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Seleccionar</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Titulo</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Año</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Categoria</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Autores</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Lenguaje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResultsLibros.length > 0 ? (
                                    searchResultsLibros.map((libro, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleRowSelection(libro)}
                                                    checked={selectedRow === libro}
                                                    className={`${styles.form_checkbox} h-5 w-5 text-blue-500`}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.titulo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.año}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.categoria}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.autores}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.lenguaje}</td>
                                        </tr>
                                    ))
                                ) : (
                                    libroData.map((libro, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleRowSelection(libro)}
                                                    checked={selectedRow && selectedRow.titulo === libro.titulo}
                                                    className={`${styles.form_checkbox} h-5 w-5 text-blue-500`}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.titulo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.año}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.categoria}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.autores}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{libro.lenguaje}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <ReactPaginate
                            previousLabel={
                                <span className="px-2 py-1 rounded border border-gray-300 bg-white">
                                    Anterior
                                </span>
                            }
                            nextLabel={
                                <span className="px-2 py-1 rounded border border-gray-300 bg-white">
                                    Siguiente
                                </span>
                            }
                            breakLabel={
                                <span className="px-2 py-1 rounded border border-gray-300 bg-white">...</span>
                            }
                            pageCount={Math.ceil(libroData.length / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination flex justify-center'}
                            subContainerClassName={'pages flex'}
                            activeClassName={'active'}
                            pageClassName={'px-2 py-1 rounded border border-gray-300 bg-white'}
                            pageLinkClassName={'text-gray-800'}
                        />
                    </div>
                </div>

                <div className={`${styles.card} max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg`}>
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Reservar Libro</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaInicio">
                            Fecha de Inicio:
                        </label>
                        <input
                            type="date"
                            id="fechaInicio"
                            name="fechaInicio"
                            value={formDataLibros.fechaInicio ?? ''}
                            onChange={handleChangeLibros}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaFin">
                            Fecha de Fin:
                        </label>
                        <input
                            type="date"
                            id="fechaFin"
                            name="fechaFin"
                            value={formDataLibros.fechaFin ?? ''}
                            onChange={handleChangeLibros}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Reservar
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default VerLibros;
