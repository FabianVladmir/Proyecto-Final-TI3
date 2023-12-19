import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';
import Alerta from '../../component/Alerta';
import styles from './styles/HomeRegister.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistroForm() {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        cui: '',
        correo: '',
        telefono: '',
        contraseña: '',
        confirmarContraseña: '',
    });

    const limpiarFormulario = () => {
        setFormData({
            nombres: '',
            apellidos: '',
            cui: '',
            correo: '',
            telefono: '',
            contraseña: '',
            confirmarContraseña: '',
        });
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validarCorreoElectronico = (correo) => {
        const regexCorreo = /^[^\s@]+@unsa\.edu\.pe$/;
        return regexCorreo.test(correo);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { nombres, apellidos, cui, correo, telefono, contraseña, confirmarContraseña } = formData;

        if ([nombres, apellidos, cui, correo, telefono, contraseña, confirmarContraseña].includes('')) {
            toast.error('Por favor, complete todos los campos', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        if (contraseña !== confirmarContraseña) {
            toast.error('Los passwords no son iguales', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        if (contraseña.length < 6) {
            toast.error('El password es muy corto, debe tener al menos 6 caracteres', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        if (cui.length !== 8) {
            toast.error('El CUI debe tener exactamente 8 caracteres', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        if (!validarCorreoElectronico(correo)) {
            toast.error('El correo electrónico no es válido', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }
        toast.success('Se ha registrado correctamente!', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });

        setTimeout(limpiarFormulario, 1000);

        console.log(formData);
    };


    return (
        <div>
            <ToastContainer />
            <div className={`${styles.hero} ${styles.heroContent} hero`}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className={`${styles.card} card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100`}>
                        <div className="max-w-screen-xl mx-auto">
                            <div className="text-center lg:text-center">
                                <a className="mx-auto flex items-center justify-center">
                                    <img src={Logo} alt="Logo" className={`${styles.logo} logo`} />
                                </a>
                                <h1 className="text-3xl font-bold">CREAR CUENTA</h1>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block">Nombres</label>
                                        <input
                                            type="text"
                                            name="nombres"
                                            value={formData.nombres}
                                            onChange={handleChange}
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

                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block">Contraseña</label>
                                        <input
                                            type="password"
                                            name="contraseña"
                                            value={formData.contraseña}
                                            onChange={handleChange}

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

                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                                {/*                                 <div className="text-center col-span-2">
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
                                </div> */}
                                <div className="mb-2 text-center">
                                    <button type="submit" className="bg-blue-600 text-white rounded p-2">
                                        Crear Cuenta
                                    </button>
                                </div>
                                <div className={`${styles.centerText} text-center`}>
                                    <label className="label">Ya tienes una cuenta? </label>
                                    <Link to="/login" className={`${styles.blueText} label-text-alt link link-hover`}>
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
