import React from 'react';
import Logo from '../../assets/ESCUELA-TELECOMUNICACIONES-UNSA-878x426.jpg'
import { Link } from 'react-router-dom';
import Calendar from '@vscode/codicons/src/icons/Calendar.svg';
import OverTime from '@tabler/icons/calendar-repeat.svg';
import MultipleSmarphones from '@tabler/icons/file-report.svg'

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

const styleImg = {
    width: '150px', // Ajusta el ancho de la imagen
    height: '150px', // Ajusta la altura de la imagen
};

function HomeAdmin(props) {
    return (
        <div style={containerStyles}>
            <div>
                <img src={Logo} alt="logo" style={imageStyles} />
            </div>
            <div style={infoContainerStyles}>
                <div style={styleInfo}>
                    <a className="btn">
                        <Link to="/admin/equipos-solicitados">
                            <p>Ver Equipos Solicitados</p>
                            <img src={Calendar} alt="Ver Equipos Solicitados" style={styleImg}/>
                        </Link>
                        
                    </a>
                </div>
                <div style={styleInfo}>
                    <a className="btn">
                        <Link to="/admin/devolucion-equipos">
                            <p>Devolucion Equipo</p>
                            <img src={OverTime} alt="Devolucion Equipo" style={styleImg} />
                        </Link>
                        
                    </a>
                </div>
                <div style={styleInfo}>
                    <a className="btn">
                        <Link to="/admin/reportes">
                            <p>Reportes</p>
                            <img src={MultipleSmarphones} alt="Reportes" style={styleImg} />
                        </Link>
                        
                    </a>
                </div>
            </div>

        </div>
    );
}

export default HomeAdmin;