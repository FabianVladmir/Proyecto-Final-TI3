import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const EquiposTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
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

  const pageCount = Math.ceil(dataEquipos.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = dataEquipos.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Equipos</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Componentes</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Estado</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap bg-gray-300">{item.Equipos}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.componentes}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.estado}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">Anterior</span>}
          nextLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">Siguiente</span>}
          breakLabel={<span className="px-2 py-1 rounded border border-gray-300 bg-white">...</span>}
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
  );
};

export default EquiposTable;
