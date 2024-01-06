import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from '../../../page/Cliente/styles/HomeReservar.module.css';
import { toast } from 'react-toastify';

const VerEquipos = () => {
    const [formDataEquipos, setFormDataEquipos] = useState({
        fecha: '',
        horaInicio: '',
        horaFin: '',
    });

    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [equipos, setEquipos] = useState([]);
    const [searchTermEquipos, setSearchTermEquipos] = useState('');
    const [searchResultsEquipos, setSearchResultsEquipos] = useState([]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const limpiarFormularioEquipos = () => {
        setFormDataEquipos({
            fecha: '',
            horaInicio: '',
            horaFin: '',
        });
        setSelectedRow(null);
    };

    const handleChangeEquipos = (e) => {
        const { name, value } = e.target;
        setFormDataEquipos({
            ...formDataEquipos,
            [name]: value,
        });
    };

    const handleRowSelection = (equipo) => {
        setSelectedRow((prevSelectedRow) =>
            prevSelectedRow && prevSelectedRow.name === equipo.name ? null : equipo
        );
    };

    const handleSubmitEquipos = (e) => {
        e.preventDefault();

        const camposVacios = Object.entries(formDataEquipos).some(([key, value]) => value.trim() === '');

        if (camposVacios || !selectedRow) {
            toast.error("Por favor, ingrese y seleccione todos los campos", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        const reservaData = {
            name: selectedRow.name,
            components: selectedRow.components,
            state: selectedRow.state,
            fecha: formDataEquipos.fecha,
            horaInicio: formDataEquipos.horaInicio,
            horaFin: formDataEquipos.horaFin,
        };

        toast.success("¡Libro reservado con éxito!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
        });

        setTimeout(() => {
            limpiarFormularioEquipos();
            setSelectedRow(null);
        }, 3000);

        console.log(reservaData);
    };

    // Efecto para cargar equipos desde el backend
    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/students/view-equipments/equipments");
                const data = await response.json();
                // Filtrar solo equipos con amount > 0
                const filteredEquipos = data.filter((equipo) => equipo.amount > 0);
                setEquipos(filteredEquipos);
                setSearchResultsEquipos(filteredEquipos);
            } catch (error) {
                console.error("Error fetching equipos:", error);
            }
        };
        fetchEquipos();
    }, []);

    const normalizeString = (str) => {
        return str
            ? str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            : "";
    };


    const handleSearch = (value) => {
        const normalizedSearchTerm = normalizeString(value);
        const filteredResults = equipos.filter((equipo) => {
            const normalizedName = normalizeString(equipo.name);
            const normalizedState = normalizeString(equipo.state);

            return (
                normalizedName.includes(normalizedSearchTerm) &&
                normalizedState.includes("operativo") &&
                equipo.amount > 0
            );
        });

        setSearchTermEquipos(value);
        setSearchResultsEquipos(filteredResults);

        const newItemsPerPage = filteredResults.length > 0 ? Math.max(filteredResults.length, 10) : 10;

        // Ajustar itemsPerPage dependiendo de la cantidad de resultados
        // Set itemsPerPage to the minimum of newItemsPerPage and a default value (e.g., 10)
        setItemsPerPage(Math.min(newItemsPerPage, 10)); //coincidencias devidido en paginas

        // Resetear la página actual al realizar una búsqueda
        setCurrentPage(0);
    };

    const equiposToDisplay = searchResultsEquipos.length > 0 ? searchResultsEquipos : equipos;
    const start = currentPage * itemsPerPage;
    const end = Math.min(start + itemsPerPage, equiposToDisplay.length);
    const equiposToDisplayPaginated = equiposToDisplay.slice(start, end);

    console.log('Equipos To Display:', equiposToDisplayPaginated);

    return (
        <>
            <form onSubmit={handleSubmitEquipos} className="grid grid-cols-2 gap-1">
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg" style={{ maxWidth: '700px' }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre del Equipo o modelo"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
                            value={searchTermEquipos}
                            onChange={(e) => handleSearch(e.target.value)}
                        />


                    </div>
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Equipos Disponibles</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto" style={{ width: '100%', border: '1px solid #000' }}>
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Seleccionar</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Name</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">State</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equiposToDisplayPaginated.map((equipo, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleRowSelection(equipo)}
                                                checked={selectedRow === equipo}
                                                className={`${styles.form_checkbox} h-5 w-5 text-blue-500`}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{equipo.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{equipo.state}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{equipo.amount}</td>
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
                            pageCount={Math.ceil(equiposToDisplay.length / itemsPerPage)}
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
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Reservar Equipo</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
                            Fecha:
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formDataEquipos.fecha}
                            onChange={handleChangeEquipos}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horaInicio">
                            Hora de Inicio:
                        </label>
                        <input
                            type="time"
                            id="horaInicio"
                            name="horaInicio"
                            value={formDataEquipos.horaInicio}
                            onChange={handleChangeEquipos}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horaFin">
                            Hora de Fin:
                        </label>
                        <input
                            type="time"
                            id="horaFin"
                            name="horaFin"
                            value={formDataEquipos.horaFin}
                            onChange={handleChangeEquipos}
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

export default VerEquipos;
