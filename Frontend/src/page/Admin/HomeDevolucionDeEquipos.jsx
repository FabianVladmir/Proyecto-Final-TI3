import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { CheckmarkSharp } from 'react-ionicons';
import { CloseSharp } from 'react-ionicons';
import './styles/HomePaginationStyles.css';

const TableDevolucionDeEquipos = () => {
    // Datos de ejemplo (puedes reemplazarlos con tus propios datos)
    const data = [
        {
            equipoLibro: 'Equipo 1',
            solicitante: 'Juan Pérez',
            fecha: '2023-10-18',
            estado: 'Pendiente',
            codigo: '123456',
            devuelto: {
                campo1: 'Icono 1',
                campo2: 'Icono 2',
            },
        },
        // Agregar más datos según sea necesario
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
            <div className="text-center">
                <p className="text-3xl font-bold mb-4">Devolucion de Equipos</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    {/* Encabezado de la tabla */}
                    <thead>
                        <tr>
{/*                             Equipo/Libro  , Estudiante , Fecha en la que deberia ser devuelta , Codigo , Devuelto y tambien edaitar donde se va cambiar la fecha de entrega
 */}                            
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Categoria</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Nombre del Estudiante</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Fecha de entrega</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Codigo</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Devolucion</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Estado de Devolucion</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Opcion</th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.equipoLibro}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.solicitante}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.fecha}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.estado}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <button type="button">
                                            <CheckmarkSharp
                                                color={'green'}
                                                beat
                                                title="Subir icono 1"
                                                height="50px"
                                                width="50px"
                                            />
                                        </button>

                                        <button type="button">
                                            <CloseSharp
                                                color={'red'}
                                                beat
                                                title="Subir icono 2"
                                                height="50px"
                                                width="50px"
                                            />
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.codigo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Paginación */}
            <div className="mt-4 flex justify-center">
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

export default TableDevolucionDeEquipos;
