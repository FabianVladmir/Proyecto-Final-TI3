import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";



const localizer = momentLocalizer(moment)

const myEventsList = [
    {
        title: 'Evento 1',
        start: new Date(2023, 10, 1, 10, 0),
        end: new Date(2023, 10, 1, 12, 0),
    },
    {
        title: 'Evento 2',
        start: new Date(2023, 10, 2, 14, 0),
        end: new Date(2023, 10, 2, 16, 0),
    },
    // Agrega más eventos según sea necesario
];


const containerStyles = {
    display: 'flex',
    flexDirection: 'column', // Establece la dirección del contenido en columnas
    justifyContent: 'center', // Centrar horizontalmente
    alignItems: 'center', // Centrar horizontalmente
    height: '60vh',
};

const containerSearch = {
    display: 'flex',
};

const infoContainerStyles = {
    gridTemplateColumns: '1fr 1fr', // Divide en dos columnas de igual ancho
    gap: '20px', // Reduje el espacio entre las columnas
    textAlign: 'center', // Centra el contenido en las columnas
};

const customBoton = {
    display: 'inline-block',
    padding: '10px 20px', /* Puedes ajustar estos valores según el tamaño deseado */
    textAlign: 'center',
    textDecoration: 'none',
    fontSize: '16px',
    backgroundColor: 'rgb(59 130 246 / var(--tw-bg-opacity))',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0.5rem', /* Espacio entre los botones */
    marginLeft: '280px', // Añade margen izquierdo al segundo botón
    marginRight: '280px', // Añade margen izquierdo al segundo botón


}
function Horario(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(myEventsList);


    const [weekRange, setWeekRange] = useState('');

    useEffect(() => {
        const today = new Date();
        const firstDayOfWeek = new Date(today);
        const lastDayOfWeek = new Date(today);

        // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
        const currentDayOfWeek = today.getDay();

        // Calcular el primer día de la semana actual (lunes)
        firstDayOfWeek.setDate(today.getDate() - currentDayOfWeek + 1);

        // Calcular el último día de la semana actual (domingo)
        lastDayOfWeek.setDate(today.getDate() + (7 - currentDayOfWeek));

        // Formatear las fechas en el formato deseado (25/12/23 al 31/12/23)
        const startDate = `${firstDayOfWeek.getDate()}/${firstDayOfWeek.getMonth() + 1}/${today.getFullYear()}`;
        const endDate = `${lastDayOfWeek.getDate()}/${lastDayOfWeek.getMonth() + 1}/${today.getFullYear()}`;

        setWeekRange(`${startDate} al ${endDate}`);
    }, []);
    // Función para filtrar eventos basados en la cadena de búsqueda
    const filterEvents = (term) => {
        const filtered = myEventsList.filter(event => event.title.toLowerCase().includes(term.toLowerCase()));
        setFilteredEvents(filtered);
        setSearchTerm(term);
    };

    return (
        <div>
            <div className='max-w-screen-md mx-auto mt-8 p-2 bg-white rounded-lg shadow-lg'>
                <div className='text-center mb-4'>
                    <p className='text-3xl font-bold'>Del {weekRange}</p>
                </div>
                <div className="search-bar" style={containerSearch}>
                    <input
                        type="text"
                        placeholder="Buscar modelo"
                        value={searchTerm}
                        onChange={e => filterEvents(e.target.value)}
                        className='text-center lg:text-center w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-1'
                    />
                </div>
                <div className="hero" style={containerStyles}>
                    <div className="calendar">
                        <Calendar
                            localizer={localizer}
                            events={filteredEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 400 }}
                        />
                    </div>
                </div>
            </div>
            <div className="buttons" style={infoContainerStyles}>
                <Link to="/client/reservar">
                    <a className='btn' style={customBoton}>Reservar Horario</a>
                </Link>
                <a className='btn' style={customBoton}>Ver Equipos</a>
            </div>
        </div>


    );
}

export default Horario;
