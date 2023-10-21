import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const TableEquiposSolicitados = () => {
    // Datos de ejemplo (puedes reemplazarlos con tus propios datos)
    const data = [
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            horaSolicitada: '09:00 AM - 11:00 AM',
            codigo: '123456',
        },
        // ... (otros datos)
    ];

    const [currentPage, setCurrentPage] = useState(0); // Estado para rastrear la página actual
    const itemsPerPage = 5; // Número de elementos por página
    const pageCount = Math.ceil(data.length / itemsPerPage); // Cálculo del número total de páginas

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentData = data.slice(offset, offset + itemsPerPage);

    return (
        <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    {/* Encabezado de la tabla */}
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left">Equipo/Libro</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left">Nombre del Solicitante</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left">Fecha</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left">Hora Solicitada</th>
                            <th className="px-6 py-3 bg-blue-500 text-white text-left">Código</th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap bg-gray-300">{item.equipoLibro}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.solicitante}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.fecha}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.horaSolicitada}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.codigo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Paginación */}
            <div className="mt-4 flex justify-center">
                <style>
                    {`
                    .pagination a.active, .pagination a.active:hover {
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
                    previousLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">Anterior</span>}
                    nextLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">Siguiente</span>}
                    breakLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">...</span>}
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
