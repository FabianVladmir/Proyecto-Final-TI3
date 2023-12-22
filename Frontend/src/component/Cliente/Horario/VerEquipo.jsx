import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from '../../../page/Cliente/styles//HomeHorario.module.css';

const VerEquipos = () => {
    const localizer = momentLocalizer(moment)

    const DataEquipos = [
        {
            title: 'Evento 1',
            start: new Date(2023, 12, 1, 10, 0),
            end: new Date(2023, 12, 1, 12, 0),
        },
        {
            title: 'Evento 2',
            start: new Date(2023, 12, 2, 14, 0),
            end: new Date(2023, 12, 2, 16, 0),
        },
    ];
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState(DataEquipos);

    // Función para filtrar eventos basados en la cadena de búsqueda
    const filterEvents = (term) => {
        const filtered = DataEquipos.filter(event => event.title.toLowerCase().includes(term.toLowerCase()));
        setFilteredEvents(filtered);
        setSearchTerm(term);
    };

    return (
        <>
            <div className={`max-w-screen-md mx-auto p-2 bg-white rounded-lg shadow-lg ${styles.containerStyles}`}>
                <div className={`search-bar ${styles.containerSearch}`}>
                    <input
                        type="text"
                        placeholder="Buscar modelo"
                        value={searchTerm}
                        onChange={e => filterEvents(e.target.value)}
                        className='text-center lg:text-center w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-1'
                    />
                </div>
                <div className={`hero ${styles.hero}`}>
                    <div className={`calendar ${styles.calendarContainer}`}>
                        <Calendar
                            localizer={localizer}
                            events={filteredEvents}
                            startAccessor="start"
                            endAccessor="end"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerEquipos;