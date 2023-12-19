import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';
import styles from './styles/HomeLogin.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomeLogin(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const limpiarFormulario = () => {
        setFormData({
            email: '',
            password: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validarCorreoElectronico = (correo) => {
        const regexCorreo = /^[^\s@]+@unsa\.edu\.pe$/;
        return regexCorreo.test(correo);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email) {
            toast.error('Por favor, ingrese el correo electrónico.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
            });
            return;
        }

        if (!formData.password) {
            toast.error('Por favor, ingrese la contraseña.', {
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


        toast.success('¡Inicio de sesión exitoso!', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 1000,
        });

        setTimeout(limpiarFormulario, 1000);

        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <div className={`${styles.hero} ${styles.heroContent} hero`}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className={`${styles.card} card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100`}>
                        <div className="text-center lg:text-center">
                            <a className="mx-auto flex items-center justify-center">
                                <img src={Logo} alt="Logo" className={`${styles.logo} logo`} />
                            </a>
                            <h1 className="text-3xl font-bold">INICIAR SESIÓN</h1>
                        </div>
                        <div className="card-body">
                            <div className={`${styles.formControl} form-control`}>
                                <label className="label">
                                    <span className="label-text">Correo</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className={`${styles.formControl} form-control`}>
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Link to="/reiniciar" className={`${styles.blueText} label-text-alt link link-hover`}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="col-span-2 text-center">
                                <button type="submit" className={`${styles.button} bg-blue-600 text-white rounded p-2`}>
                                    Iniciar Sesión
                                </button>
                            </div>
                            <div className={`${styles.centerText} text-center`}>
                                <label className="label">¿No tienes una cuenta? </label>
                                <Link to="/registrar" className={`${styles.blueText} label-text-alt link link-hover`}>
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default HomeLogin;
