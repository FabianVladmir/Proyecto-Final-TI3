import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../../page/Cliente/styles/HomeReservar.module.css';
import { toast } from 'react-toastify';

const VerLibros = () => {
    const [formDataLibros, setFormDataLibros] = useState({
        fechaInicio: '',
        fechaFin: '',
    });

    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const [itemsPerPage, setItemsPerPage] = useState(10);


    const [libros, setLibros] = useState([]);
    const [searchTermLibros, setSearchTermLibros] = useState('');
    const [searchResultsLibros, setSearchResultsLibros] = useState([]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

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
            prevSelectedRow && prevSelectedRow.title === libro.title ? null : libro
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
            title: selectedRow.title,
            year: selectedRow.year,
            category: selectedRow.category,
            'author(s)': selectedRow['author(s)'],
            language: selectedRow.language,
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

    // Efecto para cargar libros desde el backend
    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/students/view-equipments/books");
                const data = await response.json();
                setLibros(data);
            } catch (error) {
                console.error("Error fetching libros:", error);
            }
        };
        fetchLibros();
    }, []);

    const normalizeString = (str) => {
        return str
            ? str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            : "";
    };



    const handleSearchLibros = (value) => {
        const normalizedSearchTerm = normalizeString(value);
        const filteredResults = libros.filter((libro) => {
            const normalizedTitle = normalizeString(libro.title);
            const normalizedCategory = normalizeString(libro.category);

            return (
                (libro.title && normalizedTitle.includes(normalizedSearchTerm)) ||
                (libro.category && normalizedCategory.includes(normalizedSearchTerm))
            );
        });

        setSearchTermLibros(value);
        setSearchResultsLibros(filteredResults);

        const newItemsPerPage = filteredResults.length > 0 ? Math.max(filteredResults.length, 10) : 10;

        // Ajustar itemsPerPage dependiendo de la cantidad de resultados
        setItemsPerPage(Math.min(newItemsPerPage, 10)); //coincidencias devidido en paginas

        // Resetear la página actual al realizar una búsqueda
        setCurrentPage(0);
    };

    const librosToDisplay = searchResultsLibros.length > 0 ? searchResultsLibros : libros;
    const start = currentPage * itemsPerPage;
    const end = Math.min(start + itemsPerPage, librosToDisplay.length);
    const librosToDisplayPaginated = librosToDisplay.slice(start, end);



    console.log('Libros To Display:', librosToDisplayPaginated);


    return (
        <>
            <form onSubmit={handleSubmitLibros} className="grid grid-cols-2 gap-1">
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg" style={{ maxWidth: '900px' }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre del Libro o categoría"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
                            value={searchTermLibros}
                            onChange={(e) => handleSearchLibros(e.target.value)}
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
                                {librosToDisplayPaginated.map((libro, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleRowSelection(libro)}
                                                checked={selectedRow === libro}
                                                className={`${styles.form_checkbox} h-5 w-5 text-blue-500`}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{libro.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{libro.year}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{libro.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{libro['author(s)']}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{libro.language}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <ReactPaginate
                            previousLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">Anterior</span>}
                            nextLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">Siguiente</span>}
                            breakLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">...</span>}
                            pageCount={Math.ceil(librosToDisplay.length / itemsPerPage)}
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
};

export default VerLibros;
