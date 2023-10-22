import React, { useState, useEffect } from 'react';
import Equipo from 'flat-color-icons/svg/multiple_smartphones.svg'
import Libro from 'flat-color-icons/svg/reading.svg'


const infoContainerStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Divide en tres columnas de igual ancho
  gap: '10vh', // Espacio entre las columnas
  textAlign: 'center', // Centra el contenido en las columnas
};


const cardStyles = {
  width: '500px', // Ancho personalizado

};
const cardButton = {
  width: '500px', // Ancho personalizado
  height: '400px', // Ancho personalizado
};

const ReservarForm = () => {

  const [weekRange, setWeekRange] = useState('');

  useEffect(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    const lastDayOfWeek = new Date(today);

    // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const currentDayOfWeek = today.getDay();

    // Calcular el primer día de la semana actual (lunes)
    firstDayOfWeek.setDate(today.getDate() - currentDayOfWeek + 1);

    // Calcular el último día de la semana actual (domingo)
    lastDayOfWeek.setDate(today.getDate() + (7 - currentDayOfWeek));

    // Formatear las fechas en el formato deseado (25/12/23 al 31/12/23)
    const startDate = `${firstDayOfWeek.getDate()}/${firstDayOfWeek.getMonth() + 1}/${today.getFullYear()}`;
    const endDate = `${lastDayOfWeek.getDate()}/${lastDayOfWeek.getMonth() + 1}/${today.getFullYear()}`;

    setWeekRange(`${startDate} al ${endDate}`);
  }, []);

  const [formData, setFormData] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
  });

  const [tipo, setTipo] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTipoChange = (tipoSeleccionado) => {
    setTipo(tipoSeleccionado);
    setMostrarFormulario(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a tu servidor.
    console.log(`Tipo: ${tipo}`, formData);
  };

  const renderForm = () => {
    if (tipo === 'Libros' && mostrarFormulario) {
      return (
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Reservar Libro</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
              Fecha:
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horaInicio">
              Hora de Inicio:
            </label>
            <input
              type="time"
              id="horaInicio"
              name="horaInicio"
              value={formData.horaInicio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horaFin">
              Hora de Fin:
            </label>
            <input
              type="time"
              id="horaFin"
              name="horaFin"
              value={formData.horaFin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      );
    } else if (tipo === 'Equipos' && mostrarFormulario) {
      return (
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Reservar Equipo</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha">
              Fecha:
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horaInicio">
              Hora de Inicio:
            </label>
            <input
              type="time"
              id="horaInicio"
              name="horaInicio"
              value={formData.horaInicio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="horaFin">
              Hora de Fin:
            </label>
            <input
              type="time"
              id="horaFin"
              name="horaFin"
              value={formData.horaFin}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div>
        <div className='text-center mb-4'>
          <p className='text-3xl font-bold'>Del {weekRange}</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg" style={cardButton}>
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Seleccione lo que desea reservar</h2>
            <div className="flex mb-4" style={infoContainerStyles}>
              <div>
                <img src={Libro} alt="Ver equipos" />

                <button
                  className={`w-full ${tipo === 'Libros' ? 'bg-blue-500' : 'bg-gray-300'} text-white py-2 px-4 rounded-md mb-2`}
                  onClick={() => handleTipoChange('Libros')}
                >
                  Libros
                </button>
              </div>
              <div>
                <img src={Equipo} alt="Ver equipos" />
                <button
                  className={`w-full ${tipo === 'Equipos' ? 'bg-blue-500' : 'bg-gray-300'} text-white py-2 px-4 rounded-md mb-2`}
                  onClick={() => handleTipoChange('Equipos')}
                >
                  Equipos
                </button>
              </div>
            </div>
          </div>
          
          <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg" style={cardStyles}>
            <form onSubmit={handleSubmit}>
              {renderForm()}
              {mostrarFormulario && (
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Reservar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>


  );
};

export default ReservarForm;
