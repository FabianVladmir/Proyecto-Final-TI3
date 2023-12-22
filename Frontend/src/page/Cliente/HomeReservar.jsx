import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styles from './styles/HomeReservar.module.css';
import WeekRangeComponent from '../../component/Cliente/HomeReservar/GetDay.jsx';
import SeleccionEquipos from '../../component/Cliente/HomeReservar/SeleccionEquipos.jsx';
import VerLibros from '../../component/Cliente/HomeReservar/VerLibros.jsx';
import VerEquipos from '../../component/Cliente/HomeReservar/VerEquipos.jsx';


const ReservarForm = (props) => {
  

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
    console.log('Valor de showSelectionButtons:', props.showSelectionButtons);
    console.log('props.tipo:', tipo);
    console.log('mostrar formulario', mostrarFormulario);

    if (showSelectionButtons) {
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
          <SeleccionEquipos
            handleTipoChange={handleTipoChange}
            tipo={tipo}
            setMostrarFormulario={setMostrarFormulario}
          />
        </div>
      );
    } else {
      if (tipo === 'Libros' && mostrarFormulario) {
        console.log("entro a libros");
        return (
          <div>
            <div className="flex justify-end mr-14 mt-4">
              <button
                onClick={() => setShowSelectionButtons(true)}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Regresar a la selección
              </button>
            </div>
            <VerLibros />
            
          </div>
        );
      } else if (tipo === 'Equipos' && mostrarFormulario) {
        return (
          <div>
            <div className="flex justify-end mr-14 mt-4">
              <button
                onClick={() => setShowSelectionButtons(true)}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Regresar a la selección
              </button>
            </div>
            <VerEquipos />
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div>
        <div className='text-center mb-4'>
          <WeekRangeComponent />
        </div>
      </div>
      <div>
        {renderForm()}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReservarForm;
