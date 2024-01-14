import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';
import styles from './styles/HomeReset.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
    const [formData, setFormData] = useState({
        email: '',
    });


    const limpiarFormulario = () => {
        setFormData({
            email: '',
        });
    };
    const validarCorreoElectronico = (correo) => {
        const regexCorreo = /^[^\s@]+@unsa\.edu\.pe$/;
        return regexCorreo.test(correo);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email === '') {
            toast.error('Por favor, ingrese el correo electrónico.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        if (!validarCorreoElectronico(formData.email)) {
            toast.error('El correo electrónico no es válido.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }


        toast.success('¡Se reinició la contraseña correctamente!', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });

        setTimeout(limpiarFormulario, 1000);

        console.log('Estado del formulario después del éxito:', formData);
    }



    return (
        <div className={`${styles.hero} hero min-h-screen bg-base-200`}>
            <ToastContainer />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className={`${styles.card} card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100`}>
                    <div className="max-w-screen-xl mx-auto">
                        <div className="text-center lg:text-center">
                            <a className="mx-auto flex items-center justify-center">
                                <img src={Logo} alt="Logo" className={`${styles.logo} logo`} />
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
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button type="submit" className={`${styles.button} bg-blue-600 text-white rounded p-2`}>
                                    REINICIAR CONTRASEÑA
                                </button>
                            </div>
                            <div className={`${styles.centerText} text-center`}>
                                <label className="label">Volver a iniciar sesion</label>
                                <Link to="/login" className={`${styles.blueText} label-text-alt link link-hover`}>
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
