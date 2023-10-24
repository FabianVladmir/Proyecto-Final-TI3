import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const TableEquiposLibros = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTable, setCurrentTable] = useState('equipos');
  const itemsPerPage = 5;

  const dataEquipos = [
    {
      Equipos: 'Equipo 1',
      componentes: 'Componente 1, Componente 2',
      estado: 'Disponible',
      cantidad: 5,
    },
    {
      Equipos: 'Equipo 2',
      componentes: 'Componente 3, Componente 4',
      estado: 'En uso',
      cantidad: 2,
    },
    // Agrega más datos de equipos según sea necesario
  ];

  const dataLibros = [
    {
      titulo: 'Libro 1',
      estado: 'Disponible',
      cantidad: 10,
      autores: 'Autor 1, Autor 2',
      editorial: 'Editorial A',
      edicion: 'Primera',
      año: 2022,
      academico: true,
      lenguaje: 'Español',
    },
    {
      titulo: 'Libro 2',
      estado: 'En uso',
      cantidad: 3,
      autores: 'Autor 3, Autor 4',
      editorial: 'Editorial B',
      edicion: 'Segunda',
      año: 2020,
      academico: false,
      lenguaje: 'Inglés',
    },
    // Agrega más datos de libros según sea necesario
  ];

  const currentData = currentTable === 'equipos' ? dataEquipos : dataLibros;
  const pageCount = Math.ceil(currentData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = currentData.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <div className='text-center lg:text-center'>
          <p className='text-3xl font-bold mb-4'>Lista de los Equipos/Libros de la escuela</p>

          <div className="flex mb-4">
            <button
              type="button"
              className={`${currentTable === 'equipos' ? 'bg-gray-400' : 'bg-gray-200'
                  } hover:bg-gray-600 text-white flex-1 py-2 rounded-md transition duration-300 ease-in-out mr-2`}
              onClick={() => setCurrentTable('equipos')}
            >
              Equipos
            </button>
            <button
              type="button"
              className={`${currentTable === 'libros' ? 'bg-gray-400' : 'bg-gray-200'
                  } hover.bg-gray-600 text-white flex-1 py-2 rounded-md transition duration-300 ease-in-out`}
              onClick={() => setCurrentTable('libros')}
            >
              Libros
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-blue-500 text-white text-left">
                  {currentTable === 'equipos' ? 'Equipos' : 'Libros'}
                </th>
                <th className="px-6 py-3 bg-blue-500 text-white text-left">
                  {currentTable === 'equipos' ? 'Componentes' : 'Autores'}
                </th>
                <th className="px-6 py-3 bg-blue-500 text-white text-left">Estado</th>
                <th className="px-6 py-3 bg-blue-500 text-white text-left">Cantidad</th>
                {currentTable === 'libros' && (
                  // Encabezados específicos para libros
                  <>
                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Editorial</th>
                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Edición</th>
                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Año</th>
                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Académico</th>
                    <th className="px-6 py-3 bg-blue-500 text-white text-left">Lenguaje</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap bg-gray-300">
                    {currentTable === 'equipos' ? item.Equipos : item.titulo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {currentTable === 'equipos' ? item.componentes : item.autores}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.estado}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.cantidad}</td>
                  {currentTable === 'libros' && (
                    // Datos específicos para libros
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">{item.editorial}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.edicion}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.año}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.academico ? 'Sí' : 'No'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.lenguaje}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <ReactPaginate
            previousLabel={
              <span className="px-2 py-1 rounded border border-gray-300 bg-white">
                Anterior
              </span>
            }
            nextLabel={
              <span className="px-2 py-1 rounded border border-gray-300 bg-white">
                Siguiente
              </span>
            }
            breakLabel={
              <span className="px-2 py-1 rounded border border-gray-300 bg-white">...</span>
            }
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination flex justify-center'}
            subContainerClassName={'pages flex'}
            activeClassName={'active'}
            pageClassName={'px-2 py-1 rounded border border-gray-300 bg-white'}
            pageLinkClassName={'text-gray-800'}
          />
        </div>
      </div>
      <div className="flex justify-end mr-14 mt-4">
        <Link to="/client/reservar" className="bg-blue-600 text-white rounded p-2">
          Reservar Horario
        </Link>
      </div>
    </div>
  );
};

export default TableEquiposLibros;
