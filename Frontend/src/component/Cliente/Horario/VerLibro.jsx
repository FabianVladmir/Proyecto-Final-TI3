import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from '../../../page/Cliente/styles//HomeHorario.module.css';

import dataLibros from './verLibro.json';

const VerLibros = () => {
    const localizer = momentLocalizer(moment);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    useEffect(() => {
        const formattedData = dataLibros.map(event => ({
            title: event.nameBook,
            start: new Date(event.fechaStart),
            end: new Date(event.fechaEnd),
        }));

        setFilteredEvents(formattedData);
    }, []);

    // Función para filtrar eventos basados en la cadena de búsqueda
    const filterEvents = (term) => {
        const filtered = dataLibros.filter(event => event.nameBook.toLowerCase().includes(term.toLowerCase()));
        setFilteredEvents(filtered.map(event => ({
            title: event.nameBook,
            start: new Date(event.fechaStart),
            end: new Date(event.fechaEnd),
        })));
        setSearchTerm(term);
    };

    return (
        <>
            <div className={`max-w-screen-md mx-auto p-2 bg-white rounded-lg shadow-lg ${styles.containerStyles}`}>
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Libros</h2>

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

export default VerLibros;
