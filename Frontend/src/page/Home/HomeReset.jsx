import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';

const styleLogo = {
    width: '90px', // Ajusta el ancho de la imagen
    height: '90px', // Ajusta la altura de la imagen
};

const cardStyles = {
    width: '600px', // Ancho personalizado
    height: '300px'
};

const blueText = {
    color: 'blue', // Cambiar el color del texto a azul
    fontSize: '1.0rem', // Tamaño de fuente más grande
};
const centerText = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
};

const heroStyles = {
    marginTop: '-80px', // Margen superior negativo para mover el hero hacia arriba
};

function ResetPassword() {
    const [formData, setFormData] = useState({
        correo: '',
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    }

    return (
        <div className="hero min-h-screen bg-base-200" style={heroStyles}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100" style={cardStyles}>
                    <div className="max-w-screen-xl mx-auto">
                        <div className="text-center lg:text-center">
                            <a className="mx-auto flex items-center justify-center">
                                <img src={Logo} alt="Logo" style={styleLogo} />
                            </a>
                            <h1 className="text-3xl font-bold">REINICIAR CONTRASEÑA</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center">
                                    <label className="block">Correo</label>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="correo"
                                        value={formData.correo}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div  className="text-center mt-4">
                                <button type="submit" className="bg-blue-600 text-white rounded p-1">
                                    REINICIAR CONTRASEÑA
                                </button>
                            </div>
                            <div className="text-center" style={centerText}>
                                <label className="label">Volver a iniciar sesion</label>
                                <Link to="/login" className="label-text-alt link link-hover" style={blueText}>
                                    Iniciar Sesion
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
