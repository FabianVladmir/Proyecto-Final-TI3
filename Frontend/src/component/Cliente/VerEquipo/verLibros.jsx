import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const LibrosTable = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;

    // Backend
    const [libros, setLibros] = useState([]);
    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/students/view-equipments/books");
                const data = await response.json();
                setLibros(data);
            } catch (error) {
                console.error("Error fetching libros:", error);
            }
        };
        fetchLibros();
    }, []);

    // Filtrar libros basados en el término de búsqueda
    const filteredLibros = libros.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item['author(s)'] && item['author(s)'].toLowerCase().includes(searchTerm.toLowerCase()))
    );
    

    const pageCount = Math.ceil(filteredLibros.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredLibros.slice(offset, offset + itemsPerPage);

    return (
        <div>
            {/* Agregar campo de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar por título o autor(s)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text text-center w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 mb-4"
                    />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 bg-blue-500 text-white text-left sm:w-1/4">Title</th>
                            <th className="px-4 py-3 bg-blue-500 text-white text-left sm:w-1/4">Year</th>
                            <th className="px-4 py-3 bg-blue-500 text-white text-left sm:w-1/4">Edition</th>
                            <th className="px-4 py-3 bg-blue-500 text-white text-left sm:w-1/4">Editorial</th>
                            <th className="px-4 py-3 bg-blue-500 text-white text-left sm:w-1/4">Author(s)</th>
                            <th className="px-4 py-3 bg-blue-500 text-white text-left sm:w-1/4">Category</th>
                            <th className="px-4 py-3 bg-blue-500 text-white text-left sm:w-1/4">Amount</th>
                            <th className="px-4 py-3 bg-blue-500 text-white text-left sm:w-1/4">Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap bg-gray-300 overflow-hidden overflow-ellipsis">
                                    <div style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.title}>
                                        {item.title}
                                    </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">{item.year}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{item.edition}</td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    <div style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.editorial}>
                                        {item.editorial}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    <div style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item['author(s)']}>
                                        {item['author(s)']}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    <div style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={item.category}>
                                        {item.category}
                                    </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">{item.amount}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{item.language}</td>
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
