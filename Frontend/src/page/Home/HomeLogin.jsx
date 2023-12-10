// HomeLogin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';
import styles from './styles/HomeLogin.module.css';

function HomeLogin(props) {
    return (
        <div>
            <div className={`${styles.hero} ${styles.heroContent} hero`}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className={`${styles.card} card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100`}>
                        <div className="text-center lg:text-center">
                            <a className="mx-auto flex items-center justify-center">
                                <img src={Logo} alt="Logo" className={`${styles.logo} logo`} />
                            </a>
                            <h1 className="text-3xl font-bold">INICIA SESION</h1>
                        </div>
                        <div className="card-body">
                            <div className={`${styles.formControl} form-control`}>
                                <label className="label">
                                    <span className="label-text">Correo</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className={`${styles.formControl} form-control`}>
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="flex justify-end">
                                <Link to="/reiniciar" className={`${styles.blueText} label-text-alt link link-hover`}>
                                    Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <Link to="/">
                                <div className="col-span-2 text-center">
                                    <button type="submit" className={`${styles.button} bg-blue-600 text-white rounded p-2`}>
                                        Crear Cuenta
                                    </button>
                                </div>
                            </Link>
                            <div className={`${styles.centerText} text-center`}>
                                <label className="label">No tienes una cuenta? </label>
                                <Link to="/registrar" className={`${styles.blueText} label-text-alt link link-hover`}>
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLogin;
