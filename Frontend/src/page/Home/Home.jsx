import React from 'react';
import Logo from '../../assets/ESCUELA-TELECOMUNICACIONES-UNSA-878x426.jpg'


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



function Home(props) {
    return (
        <div style={containerStyles}>
            <div>
                <img src={Logo} alt="logo" style={imageStyles} />
            </div>

        </div>
    );
}

export default Home;