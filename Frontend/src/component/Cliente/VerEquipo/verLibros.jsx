import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const LibrosTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

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

  const pageCount = Math.ceil(dataLibros.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = dataLibros.slice(offset, offset + itemsPerPage);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Libros</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Autores</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Estado</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Cantidad</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Editorial</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Edición</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Año</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Académico</th>
              <th className="px-6 py-3 bg-blue-500 text-white text-left">Lenguaje</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap bg-gray-300">{item.titulo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.autores}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.estado}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cantidad}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.editorial}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.edicion}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.año}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.academico ? 'Sí' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.lenguaje}</td>
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

export default LibrosTable;
