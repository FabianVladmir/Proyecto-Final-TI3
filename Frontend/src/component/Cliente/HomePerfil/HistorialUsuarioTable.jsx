import React, { useState } from 'react';
import formattedDate from '../../Admin/DevolucionDeEquipos/FormattedDate';
import parseCustomTime from '../../Admin/DevolucionDeEquipos/parseCustomTime';
import getEstadoDevolucion from '../../Admin/Reportes/getEstadoDevolucion';
import ReactPaginate from 'react-paginate';



function HistorialUsuarioTable({ userHistory, itemDetails }) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Número de elementos por página

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = userHistory.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(userHistory.length / itemsPerPage);

    return (
        <div>
            <table className="w-full table-auto mt-4">
                <thead>
                    <tr>
                        <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Fecha de entrega</th>
                        <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Fecha de devolucion</th>
                        <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Categoria</th>
                        <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Nombre del Equipo/Libro</th>
                        <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length === 0 ? (
                        // Show a message when no matches are found
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                No se encontraron reportes en la tabla.
                            </td>
                        </tr>
                    ) : (
                        currentItems.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.itemType === 'Book' ? (<p>{formattedDate(item.returnDate)}</p>) : (<p>{formattedDate(item.returnDate) + ' ' + parseCustomTime(item.endHour)}</p>)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.currentTime).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.itemType === 'Book' ? (<p>Libro</p>) : (<p>Equipo</p>)}</td>

                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                <div style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>

                                    {itemDetails[item.itemId] ? (
                                        item.itemType === 'Book' ? (
                                            itemDetails[item.itemId].title
                                        ) : (
                                            itemDetails[item.itemId].name
                                        )
                                    ) : 'Detalles no disponibles'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p style={{ color: getEstadoDevolucion(item, item.currentTime) === 'ENTREGA A TIEMPO' ? 'green' : 'red' }}>
                                        {getEstadoDevolucion(item, item.currentTime)}
                                    </p>
                                </td>

                            </tr>
                        ))
                    )}
                </tbody>
            </table>


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
}

export default HistorialUsuarioTable;