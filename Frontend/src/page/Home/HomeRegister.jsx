import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';

import Alerta from '../../component/Alerta';


const styleLogo = {
    width: '90px', // Ajusta el ancho de la imagen
    height: '90px', // Ajusta la altura de la imagen
};

const cardStyles = {
    width: '600px', // Ancho personalizado
    height: '570px'
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
    marginTop: '-72px', // Margen superior negativo para mover el hero hacia arriba
};

function RegistroForm() {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        cui: '',
        correo: '',
        telefono: '',
        contraseña: '',
        confirmarContraseña: '',
        aceptaTerminos: false,
    });

    const [alerta, setAlerta] = useState({});

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const {nombres, apellidos, cui, correo, telefono, contraseña, confirmarContraseña} = formData;
        console.log("vacio");

        if([nombres, apellidos, cui, correo, telefono, contraseña, confirmarContraseña].includes('')){
            console.log("vacio");
            setAlerta({ msg: 'Hay campos vacios', error: true })
            return;              
        }
        
        if(contraseña !== confirmarContraseña) {
            setAlerta({ msg: 'Los Password no son iguales', error: true })
            return
        }

        if(contraseña.length < 6) {
            setAlerta({ msg: 'El Password es muy corto, agrega minimo 6 caracteres', error: true })
            return
        }

        setAlerta({});




        // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    }

    const {msg} = alerta
    
    return (
        <div>
            <div className="hero min-h-screen bg-base-200" style={heroStyles}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100" style={cardStyles}>
                        <div className="max-w-screen-xl mx-auto">
                            <div className="text-center lg:text-center">
                                <a className="mx-auto flex items-center justify-center">
                                    <img src={Logo} alt="Logo" style={styleLogo} />
                                </a>
                                <h1 className="text-3xl font-bold">CREAR CUENTA</h1>
                            </div>
                            
                            {msg && <Alerta 
                                alerta={alerta}
                            />}

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block">Nombres</label>
                                        <input
                                            type="text"
                                            name="nombres"
                                            value={formData.nombres}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block">Apellidos</label>
                                        <input
                                            type="text"
                                            name="apellidos"
                                            value={formData.apellidos}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block">CUI</label>
                                    <input
                                        type="number"
                                        name="cui"
                                        value={formData.cui}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block">Correo</label>
                                    <input
                                        type="email"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block">Contraseña</label>
                                        <input
                                            type="password"
                                            name="contraseña"
                                            value={formData.contraseña}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block">Confirmar Contraseña</label>
                                        <input
                                            type="password"
                                            name="confirmarContraseña"
                                            value={formData.confirmarContraseña}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                                <div className="text-center col-span-2">
                                    <label className="block">
                                        <input
                                            type="checkbox"
                                            name="aceptaTerminos"
                                            checked={formData.aceptaTerminos}
                                            onChange={handleChange}
                                            className="mr-4"
                                        />
                                        Acepto los términos y condiciones
                                    </label>
                                </div>
                                <div className="col-span-2 text-center">
                                    <button type="submit" className="bg-blue-600 text-white rounded p-2">
                                        Crear Cuenta
                                    </button>
                                </div>
                                <div className="text-center" style={centerText}>
                                    <label className="label">Ya tienes una cuenta? </label>
                                    <Link to="/login" className="label-text-alt link link-hover" style={blueText}>
                                        Iniciar Sesion
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroForm;
