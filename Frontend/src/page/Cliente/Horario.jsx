import React, { useState } from 'react';
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
    height: '80vh',
};

const containerSearch = {
    display: 'flex',
    justifyContent: 'center', // Centrar horizontalmente
    alignItems: 'center', // Centrar horizontalmente
};

const infoContainerStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Divide en tres columnas de igual ancho
    gap: '150vh', // Espacio entre las columnas
    textAlign: 'center', // Centra el contenido en las columnas
};

function Horario(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(myEventsList);

    // Función para filtrar eventos basados en la cadena de búsqueda
    const filterEvents = (term) => {
        const filtered = myEventsList.filter(event => event.title.toLowerCase().includes(term.toLowerCase()));
        setFilteredEvents(filtered);
        setSearchTerm(term);
    };

    return (
        <div>
            <div className="search-bar" style={containerSearch}>
                <label>Modelo: </label>
                <input
                    type="text"
                    placeholder="Buscar modelo"
                    value={searchTerm}
                    onChange={e => filterEvents(e.target.value)}
                />
            </div>
            <div className="hero" style={containerStyles}>
                <div className="calendar">
                    <Calendar
                        localizer={localizer}
                        events={filteredEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </div>
                <div className="buttons" style={infoContainerStyles}>
                    <Link to="/client/reservar">
                        <a className='btn'>Reservar Horario</a>
                    </Link>
                    
                    <a className='btn'>Ver Equipos</a>
                </div>
            </div>
        </div>

    );
}

export default Horario;
