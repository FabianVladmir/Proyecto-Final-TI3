import React, { useState } from 'react';
import Logo from '../../assets/ce-epcc.png';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles//HomeReset.module.css';

import axios from 'axios';

function ResetPasswordPage() {
    const { token } = useParams();
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar solicitud al backend para cambiar la contraseña
        try {
            const response = await axios.post(`http://localhost:4000/api/students/reset-password/${token}`, {
                password,
            });

            if (response.status === 200) {
                // Contraseña modificada satisfactoriamente
                toast.success('Contraseña modificada correctamente.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                });

                // Limpiar el formulario después de 3000 milisegundos (3 segundos)
                setTimeout(() => {
                    setPassword('');
                }, 3000);
            } else {
                // Manejar el caso en que el token es inválido o ya ha sido utilizado
                toast.error(`Error al modificar la contraseña. ${response.data.msg}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error en la solicitud al servidor:', error);
            // Puedes mostrar un mensaje de error genérico aquí si ocurre algún error de red o del servidor.
            toast.error('Error al modificar la contraseña. Por favor, solicite un nuevo token para el cambio de contraseña.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className={`${styles.hero} hero min-h-screen bg-base-200`}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className={`${styles.card} card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100`}>
                    <div className="max-w-screen-xl mx-auto">
                        <div className="text-center lg:text-center">
                            <a className="mx-auto flex items-center justify-center">
                                <img src={Logo} alt="Logo" className={`${styles.logo} logo`} />
                            </a>
                            <h1 className="text-2xl font-bold">REINICIAR CONTRASEÑA</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="block">Nueva Contraseña</span>
                                </label>
                                <div>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded-lg"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button type="submit" className={`${styles.button} bg-blue-600 text-white rounded p-2`}>
                                    Cambiar Contraseña
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
