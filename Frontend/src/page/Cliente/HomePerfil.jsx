import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import formattedDate from '../../component/Admin/DevolucionDeEquipos/FormattedDate';
import parseCustomTime from '../../component/Admin/DevolucionDeEquipos/parseCustomTime';
import getEstadoDevolucion from '../../component/Admin/Reportes/getEstadoDevolucion';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
function Perfil() {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [userHistory, setUserHistory] = useState([]);


    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/students/user-history-by-id/${userId}`);
                const receivedData = response.data;

                // Asegúrate de que receivedData sea un array o conviértelo en uno si es un objeto
                const historyArray = Array.isArray(receivedData) ? receivedData : [receivedData];

                setUserHistory(historyArray);
            } catch (error) {
                console.error('Error al obtener historial del usuario', error);
            }
        };
        if (userId === null) {
            // Puedes redirigir o mostrar un mensaje aquí
            navigate('/login');
        } else {
            fetchUserHistory();
        }
    }, [userId, navigate]);

    return (
        <div className="max-w-screen-xl mx-auto mt-2 p-2 bg-white rounded-lg shadow-lg">
            <div className='text text-center'>
                <p>Perfil del Estudiante: {userId}</p>

            </div>
            <div className="overflow-x-auto">

                <table className="w-full table-auto">
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
                        {userHistory.length === 0 ? (
                            // Show a message when no matches are found
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No se encontraron reportes en la tabla.
                                </td>
                            </tr>
                        ) : (
                            userHistory && userHistory.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.itemType === 'Book' ? (<p>{formattedDate(item.returnDate)}</p>) : (<p>{formattedDate(item.returnDate) + ' ' + parseCustomTime(item.endHour)}</p>)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(item.currentTime).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.itemType === 'Book' ? (<p>Libro</p>) : (<p>Equipo</p>)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* {itemDetails[item.itemId] ? itemDetails[item.itemId].name : 'No details available'} */}
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
            </div>

        </div>
    );
}

export default Perfil;