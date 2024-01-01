import React, { useState } from 'react';
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
    };;

    const handleRowSelection = (equipo) => {
        setSelectedRow((prevSelectedRow) =>
            prevSelectedRow && prevSelectedRow.equipo === equipo.equipo ? null : equipo
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
            equipo: selectedRow.equipo,
            componentes: selectedRow.componentes,
            estado: selectedRow.estado,
            modelo: selectedRow.modelo,
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

    const equipoData = [
        {
            equipo: 'Equipo 1',
            componentes: 'Componente 1, Componente 2',
            estado: 'Disponible',
            modelo: 'Modelo 123',
        },
        {
            equipo: 'Equipo 2',
            componentes: 'Componente 3, Componente 4',
            estado: 'En uso',
            modelo: 'Modelo 456',
        },
        // Agrega más datos de equipos según sea necesario
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const [searchTermEquipos, setSearchTermEquipos] = useState('');
    const [searchResultsEquipos, setSearchResultsEquipos] = useState([]);

    const handleSearch = (searchTermEquipos) => {
        const filteredResults = equipoData.filter((e) => {
            return (
                e.equipo.toLowerCase().includes(searchTermEquipos.toLowerCase()) ||
                e.modelo.toLowerCase().includes(searchTermEquipos.toLowerCase())
            );
        });
        setSearchResultsEquipos(filteredResults);
    };

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
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchTermEquipos(value);
                                handleSearch(value);
                            }}
                        />
                    </div>
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Equipos Disponibles</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto" style={{ width: '100%', border: '1px solid #000' }}>
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Seleccionar</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Equipo</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Componentes</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Estado</th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Modelo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResultsEquipos.length > 0 ? (
                                    searchResultsEquipos.map((equipo, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleRowSelection(equipo)}
                                                    checked={selectedRow === equipo}
                                                    className={`${styles.form_checkbox} h-5 w-5 text-blue-500`}
                                                />

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{equipo.equipo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{equipo.componentes}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{equipo.estado}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{equipo.modelo}</td>
                                        </tr>
                                    ))
                                ) : (
                                    equipoData.map((equipo, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleRowSelection(equipo)}
                                                    checked={selectedRow && selectedRow.equipo === equipo.equipo}
                                                    className={`${styles.form_checkbox} h-5 w-5 text-blue-500`}
                                                />


                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{equipo.equipo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{equipo.componentes}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{equipo.estado}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{equipo.modelo}</td>
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
                            pageCount={Math.ceil(equipoData.length / itemsPerPage)}
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
