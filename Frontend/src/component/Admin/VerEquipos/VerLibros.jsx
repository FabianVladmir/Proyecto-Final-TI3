import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';



const VerLibros = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;

    // Datos de ejemplo para la tabla (puedes reemplazar esto con tu lógica de obtención de datos)
    const [libros, setLibros] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/get/books");
                setLibros(response.data);
            } catch (error) {
                console.error('Error al obtener los libros:', error);
            }
        };

        fetchData();
    }, []);

    const normalizeString = (str) => {
        return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    };

    // Filtrar libros basados en el término de búsqueda
    const searchTermKeywords = normalizeString(searchTerm.toLowerCase()).split(' ');
    const filteredLibros = libros.filter((item) => {
        const combinedFields = Object.values(item)
            .filter((val) => typeof val === 'string' || typeof val === 'number')
            .map((val) => normalizeString(val.toString()))
            .join(' ');

        const includesSearchTerm = searchTermKeywords.every((keyword) => combinedFields.includes(keyword));
        return includesSearchTerm;
    });

    const pageCount = Math.ceil(filteredLibros.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredLibros.slice(offset, offset + itemsPerPage);

    const handleEdit = (itemId) => {
        // Lógica para manejar la edición del libro con el ID itemId
        console.log("Editar libro con ID:", itemId);
    };

    const handleDelete = (itemId) => {
        // Lógica para manejar la eliminación del libro con el ID itemId
        console.log("Eliminar libro con ID:", itemId);
    };

    return (
        <div>
            {/* Agregar campo de búsqueda */}
            <div>
                <input
                    type="text"
                    placeholder="Buscar por título, categoria o lenguaje español o ingles(ES o EN)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text text-center w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
                />
            </div>

            <div className="overflow-x-auto max-h-96"> {/* Establecer una altura máxima */}
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
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 bg-gray-800 text-white text-center min-w-30">
                                <div className="max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap" title="Título">
                                    Título
                                </div>
                            </th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Año</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-30">Edición</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-40 md:min-w-40">Editorial</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-40 md:min-w-40">Autores</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-40 md:min-w-40">Categoría</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-25">Cantidad</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-20">Lenguaje</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-20">Estado</th>
                            <th className="sm:px-2 py-3 bg-gray-800 text-white text-center sm:min-w-20 md:min-w-20">Opción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap bg-gray-300 overflow-hidden overflow-ellipsis">
                                    <div style={{ maxWidth: "400px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.title}>
                                        {item.title}
                                    </div>
                                </td>
                                <td className="px-4 py-4">{item.year}</td>
                                <td className="px-4 py-4">{item.edition}</td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    <div style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.editorial}>
                                        {item.editorial}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    <div style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item['author(s)']}>
                                        {item['author(s)']}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    <div style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.category}>
                                        {item.category}
                                    </div>
                                </td>
                                <td className="px-4 py-4">{item.amount}</td>
                                <td className="px-4 py-4">{item.language}</td>
                                <td className="px-4 py-4">{item.state}</td>
                                <td className="px-8 py-4">
                                    <button onClick={() => handleEdit(item._id)} className="bg-blue-500 text-white px-5 py-1 rounded mr-2">Editar</button>
                                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px- py-1 rounded">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VerLibros;
