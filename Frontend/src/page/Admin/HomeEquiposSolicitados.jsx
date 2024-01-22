import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';


import './styles/HomePaginationStyles.css';
import axios from 'axios';
import ModalDetallesEquipo from '../../component/Admin/EquiposSolicitados/ModalDetallesEquipo';

const TableEquiposSolicitados = () => {
    // Datos de ejemplo (puedes reemplazarlos con tus propios datos)
    const [reservas, setReservas] = useState([]);
    // OBTENER TODAS LAS RESERVACIONES DEL LIBRO
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseBook = await axios.get("http://localhost:4000/api/admin/getReservation/books");
                const responseEquipment = await axios.get("http://localhost:4000/api/admin/getReservation/equipments");
                const combinedReservas = [...responseBook.data, ...responseEquipment.data];

                // Ordenar por la propiedad 'createdAt'
                combinedReservas.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);

                    // Compara las fechas
                    if (dateA < dateB) return -1;
                    if (dateA > dateB) return 1;

                    // Si las fechas son iguales, compara las horas
                    const timeA = dateA.getTime();
                    const timeB = dateB.getTime();

                    return timeA - timeB;
                });
                const reservasWithNames = await Promise.all(combinedReservas.map(async (item) => {
                    const studentResponse = await axios.get(`http://localhost:4000/api/admin/getStudent/${item.userId}`);
                    const studentName = studentResponse.data.firstname + ' ' + studentResponse.data.lastname;

                    return { ...item, studentName };
                }));
                setReservas(reservasWithNames);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };
        fetchData();
    }, []);

    const [currentPage, setCurrentPage] = useState(0); // Estado para rastrear la página actual
    const itemsPerPage = 5; // Número de elementos por página
    const pageCount = Math.ceil(reservas.length / itemsPerPage); // Cálculo del número total de páginas

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentData = reservas.slice(offset, offset + itemsPerPage);

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedItemDetails, setSelectedItemDetails] = useState(null);
    const [typeItem, setTypeItem] = useState(null);
    const [idReserva, setIdReserva] = useState(null);

    // Mostrar mas detalles del Equipo
    const [selectedItem, setSelectedItem] = useState(null);
    const handleVerDetallesClick = async (type, itemId, reservationId) => {
        try {
            // Corrige el tipo de categoría aquí
            const correctedType = type === 'book' ? 'books' : 'equipments';
            const response = await axios.get(`http://localhost:4000/api/admin/getDetails/${correctedType}/${itemId}`);
            setSelectedItem(response.data);
            setShowDetailsModal(true);
            setSelectedItemDetails(itemId); // actualuzar el id del equipo o libro
            setIdReserva(reservationId); // Actualizar el id de la reserva 
            setTypeItem(type); //actualizar el type del equipo o libro
            console.log(selectedItem);
            // Abre tu modal aquí
        } catch (error) {
            console.error('Error al obtener detalles:', error);
        }
    }
    return (
        <div className="max-w-screen-xl mx-auto mt-2 p-2 bg-white rounded-lg shadow-lg">
            {showDetailsModal && selectedItemDetails && typeItem && idReserva &&(
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <ModalDetallesEquipo details={selectedItemDetails} type={typeItem} idReservation={idReserva} onClose={() => setShowDetailsModal(false)} />
                </div>
            )}
            <div className='text-center lg:text-center'>
                <p className='text-3xl font-bold mb-4'>Equipos Solicitados del día</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    {/* Encabezado de la tabla */}
                    <thead>
                        <tr>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Categoria</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Nombre del Solicitante</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Fecha Solicitada</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Hora Solicitada</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Código</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Estado</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30"></th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody>
                        {currentData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                                <td className="px-6 py-4 whitespace-nowrap bg-gray-300">{item.type === 'book' ? (<p>Libro</p>) : (<p>Equipo</p>)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.studentName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.createdAt).toLocaleTimeString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.verificationCode}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.state}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.type === 'book' ? (
                                        <button onClick={() => handleVerDetallesClick(item.type, item.bookId, item._id)} className="px-5 py-1 rounded bg-green-500 text-white hover:bg-blue-700">
                                            Ver más detalles
                                        </button>) : (
                                        <button onClick={() => handleVerDetallesClick(item.type, item.equipmentId, item._id)} className="px-5 py-1 rounded bg-green-500 text-white hover:bg-blue-700">
                                            Ver más detalles
                                        </button>)}
                                </td>
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

export default TableEquiposSolicitados;
