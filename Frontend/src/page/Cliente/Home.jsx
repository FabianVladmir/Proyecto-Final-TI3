import React from 'react';
import Logo from '../../assets/ESCUELA-TELECOMUNICACIONES-UNSA-878x426.jpg'

import Calendar from 'flat-color-icons/svg/calendar.svg'
import OverTime from 'flat-color-icons/svg/overtime.svg'
import MultipleSmarphones from 'flat-color-icons/svg/multiple_smartphones.svg'

const imageStyles = {
    width: '1200px', // Ajusta el ancho de la imagen
    height: '400px', // Ajusta la altura de la imagen
};

const containerStyles = {
    display: 'flex',
    flexDirection: 'column', // Establece la dirección del contenido en columnas
    justifyContent: 'center', // Centrar horizontalmente
    alignItems: 'center', // Centrar horizontalmente
};

const infoContainerStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr', // Divide en tres columnas de igual ancho
    gap: '50vh', // Espacio entre las columnas
    textAlign: 'center', // Centra el contenido en las columnas
};

const styleInfo = {
    width: '150px', // Ajusta el ancho de la imagen
    height: '150px', // Ajusta la altura de la imagen
};


function Home(props) {
    return (
        <div style={containerStyles}>
            <div>
                <img src={Logo} alt="logo" style={imageStyles} />
            </div>
            <div style={infoContainerStyles}>
                <div style={styleInfo}>
                    <a className="btn">
                        <p>Ver Horarios</p>
                        <img src={Calendar} alt="ver Horarios" />
                    </a>
                </div>
                <div style={styleInfo}>
                    <a className="btn">
                        <p>Reservar Horarios</p>
                        <img src={OverTime} alt="Reservar Horarios" />
                        </a>
                </div>
                <div style={styleInfo}>
                    <a className="btn">
                        <p>Ver equipos</p>
                        <img src={MultipleSmarphones} alt="Ver equipos" />
                    </a>
                </div>
            </div>

        </div>
    );
}

export default Home;