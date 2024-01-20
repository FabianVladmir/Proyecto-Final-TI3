import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useUser } from '../../context/UserContext';

function Perfil() {
    const { userId } = useUser();
    const navigate = useNavigate();


    useEffect(() => {
        if (userId === null) {
            // Puedes redirigir o mostrar un mensaje aquí
            navigate('/login');
        }
        // Resto del código de tu useEffect
    }, [userId, navigate]);

    useEffect(() => {
        console.log('User ID:', userId);
    }, [userId]);
    return (
        <div>
            <p>Perfil del Estudiante: {userId}</p>
        </div>
    );
}

export default Perfil;