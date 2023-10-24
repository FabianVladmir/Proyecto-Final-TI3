import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const TableEquiposSolicitados = () => {
    // Datos generales
    const dataGeneral = [
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            devolvioEquipo: 'SI',
        },
        {
            equipoLibro: 'Equipo 2',
            solicitante: 'Ana Gómez',
            fecha: '2023-10-19',
            devolvioEquipo: 'NO',
        },
        // Agrega más datos generales según sea necesario
    ];

    // Datos personales
    const dataPersonal = [
        {
            estudiante: 'Ana Gómez',
            fecha: '2023-10-19',
            equipoLibro: 'Equipo 2',
            estado: 'Prestado',
            devolvioEquipo: 'NO',
        },
        {
            estudiante: 'Carlos López',
            fecha: '2023-10-20',
            equipoLibro: 'Equipo 4',
            estado: 'Prestado',
            devolvioEquipo: 'SI ',
        },

        // Agrega más datos personales según sea necesario
    ];

    const [currentTable, setCurrentTable] = useState('general');
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const data = currentTable === 'general' ? dataGeneral : dataPersonal;

    const filterData = (data, term) => {
        return data.filter((item) =>
        (currentTable === 'personal'
            ? item.estudiante.toLowerCase().includes(term.toLowerCase()) || item.equipoLibro.toLowerCase().includes(term.toLowerCase())
            : item.equipoLibro.toLowerCase().includes(term.toLowerCase()))
        );
    };


    const filteredData = filterData(data, searchTerm);

    const itemsPerPage = 5;
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentData = filteredData.slice(offset, offset + itemsPerPage);

    const switchTable = (table) => {
        setCurrentTable(table);
        setCurrentPage(0);
        setSearchTerm('');
    };
    
    return (
        <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <div className='text-center lg:text-center'>
                <p className='text-3xl font-bold mb-4'>Reportes</p>
                <div className="flex mb-4">
                    <button
                        type="button"
                        className={`${currentTable === 'general' ? 'bg-gray-400' : 'bg-gray-200'
                            } hover:bg-gray-600 text-white flex-1 py-2 rounded-md transition duration-300 ease-in-out mr-2`}
                        onClick={() => switchTable('general')}
                    >
                        GENERAL
                    </button>
                    <button
                        type="button"
                        className={`${currentTable === 'personal' ? 'bg-gray-400' : 'bg-gray-200'
                            } hover-bg-gray-600 text-white flex-1 py-2 rounded-md transition duration-300 ease-in-out`}
                        onClick={() => switchTable('personal')}
                    >
                        PERSONAL
                    </button>
                </div>


            </div>
            {currentTable === 'personal' && (
                <div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre de Estudiante o por nombre de Equipo/Libro"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
                    />
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left">
                                {currentTable === 'personal' ? 'Estudiante' : 'Equipo/Libro'}
                            </th>
                            {currentTable === 'general' && (
                                <th className="px-6 py-3 bg-blue-500 text-white text-left">
                                    Solicitante
                                </th>
                            )}
                            <th className="px-6 py-3 bg-blue-500 text-white text-left">Fecha</th>
                            {currentTable === 'personal' && (
                                <>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">
                                        Equipo/Libro
                                    </th>
                                    <th className="px-6 py-3 bg-blue-500 text-white text-left">
                                        Estado
                                    </th>
                                </>
                            )}
                            <th className="px-6 py-3 bg-blue-500 text-white text-left">
                                {currentTable === 'personal' ? 'Devuelto Equipo' : 'Devuelto Equipo'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap bg-gray-300">
                                    {currentTable === 'personal' ? item.estudiante : item.equipoLibro}
                                </td>
                                {currentTable === 'general' && (
                                    <td className="px-6 py-4 whitespace-nowrap">{item.solicitante}</td>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap">{item.fecha}</td>
                                {currentTable === 'personal' && (
                                    <>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.equipoLibro}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.estado}</td>
                                    </>
                                )}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {currentTable === 'personal' ? item.devolvioEquipo : item.devolvioEquipo}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-center">
                <style>
                    {`
                    .pagination a.active,
                    .pagination a.active:hover {
                        background-color: #007BFF;
                        color: #fff;
                        border-color: #007BFF;
                    }

                    .pagination li {
                        display: inline-block;
                        padding: 0.5rem 0.75rem;
                        margin: 0.125rem;
                        cursor: pointer;
                    }

                    .pagination li.active {
                        background-color: #ccc;
                        color: #fff;
                    }
                    `}
                </style>
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
                    pageCount={pageCount}
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
    );
};

export default TableEquiposSolicitados;
