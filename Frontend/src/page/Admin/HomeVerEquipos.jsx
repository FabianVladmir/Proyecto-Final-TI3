import React, { useState, useEffect } from 'react';
import Logo from '../../assets/ce-epcc.png';
import { toast, ToastContainer } from 'react-toastify';
import styles from './styles/HomeAgregarEquipos.module.css';
import "react-toastify/dist/ReactToastify.css";
import SeleccionEquipos from '../../component/SeleccionEquipos';

const verEquipos = () => {
    //SeleccionEquipos.jsx
    const [showSelectionButtons, setShowSelectionButtons] = useState(true);
    const [tipo, setTipo] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const handleTipoChange = (tipoSeleccionado) => {
        setTipo(tipoSeleccionado);
        setMostrarFormulario(true);
        setShowSelectionButtons(false);
    };

    const renderForm = () => {
        if (showSelectionButtons) {
            return (
                <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Seleccione lo que desea ver</h2>

                    <SeleccionEquipos
                        handleTipoChange={handleTipoChange}
                        tipo={tipo}
                        setMostrarFormulario={setMostrarFormulario}
                    />
                </div>
            );
        } else {
            if (tipo === 'Libros' && mostrarFormulario) {
                return (
                    <div>
                        <div className={`hero min-h-screen bg-white rounded-lg shadow-lg ${styles.hero}`}>
                            <div className={`${styles.card}`}>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setShowSelectionButtons(true)}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                <div className="text-center lg:text-center">
                                    <a className="mx-auto flex items-center justify-center">
                                        <img src={Logo} alt="Logo" className={`${styles.logo}`} />
                                    </a>
                                </div>
                                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Lista de Libros</h2>
                                {/* <AgregarLibros /> */}

                            </div>
                        </div>
                    </div>
                );
            } else if (tipo === 'Equipos' && mostrarFormulario) {
                return (
                    <div>
                        <div className={`hero min-h-screen bg-white rounded-lg shadow-lg ${styles.hero}`}>
                            <div className={`${styles.card}`}>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setShowSelectionButtons(true)}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                <div className="text-center lg:text-center">
                                    <a className="mx-auto flex items-center justify-center">
                                        <img src={Logo} alt="Logo" className={`${styles.logo}`} />
                                    </a>
                                </div>
                                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Lista de Equipos</h2>
                                {/* <AgregarEquipos /> */}
                            </div>
                        </div>
                    </div>
                );
            }
        }
    };

    return (
        <div>
            <ToastContainer />
            <div>
                {renderForm()}
            </div>
        </div>
    );
};

export default verEquipos;
