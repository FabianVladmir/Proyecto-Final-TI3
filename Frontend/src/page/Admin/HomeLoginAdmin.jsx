import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';
import styles from './styles/HomeLoginAdmin.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function HomeLoginAdmin(props) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
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
        try {
            const response = await fetch("http://localhost:4000/api/students/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                // Guarda el token en las cookies del cliente
                Cookies.set('token', data.token, { expires: 7 });

                // Aquí puedes continuar con el resto del código después del inicio de sesión exitoso
                // Por ejemplo, puedes realizar más acciones, cargar datos adicionales, etc.

                toast.success('¡Inicio de sesión exitoso!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });

                setTimeout(() => {
                    limpiarFormulario();
                    // Redirige a la página deseada después del inicio de sesión
                    navigate('/admin/home'); // Ajusta la ruta según tus necesidades
                }, 1000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.msg || "Error durante el inicio de sesión", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000,
                });
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            toast.error(
                "Error durante el inicio de sesión. Por favor, inténtelo de nuevo.",
                {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 1000,
                }
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <div className={`${styles.hero} ${styles.heroContent} ${styles.blackBackground} hero`}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className={`${styles.card} card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100`}>
                        <div className="text-center lg:text-center">
                            <a className="mx-auto flex items-center justify-center">
                                <img src={Logo} alt="Logo" className={`${styles.logo} logo`} />
                            </a>
                            <h1 className="text-2xl font-bold">INICIO DE SESIÓN COMO ADMINISTRADOR</h1>
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
{/*                             <div className={`${styles.centerText} text-center`}>
                                <label className="label">¿No tienes una cuenta? </label>
                                <Link to="/registrar" className={`${styles.blueText} label-text-alt link link-hover`}>
                                    Registrarse
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default HomeLoginAdmin;
