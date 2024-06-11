import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const SaleList: React.FC = () => {
    const [sales, setSales] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/sales').then((response) => {
            console.log(response.data); // Verificar datos
            setSales(response.data);
        }).catch(error => {
            console.error('Error fetching sales:', error);
        });
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/sales/${id}/delete`);
            setSales(prevSales => prevSales.filter(sale => sale.id !== id));
        } catch (error) {
            console.error('Error deleting sale:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Listado de Ventas</h2>
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/5 py-2">ID</th>
                        <th className="w-1/5 py-2">Cliente</th>
                        <th className="w-1/5 py-2">Fecha</th>
                        <th className="w-1/5 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {sales.map((sale: any) => (
                        <tr key={sale.id}>
                            <td className="text-center py-2">{sale.id}</td>
                            <td className="text-center py-2">{sale.client_name}</td>
                            <td className="text-center py-2">{new Date(sale.date).toLocaleDateString()}</td>
                            <td className="text-center py-2">
                                <Link to={`/sale/${sale.id}`} className="text-blue-500 hover:text-blue-700">
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                                <Link to={`/sale/${sale.id}/edit`} className="text-yellow-500 hover:text-yellow-700 ml-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <button onClick={() => handleDelete(sale.id)} className="text-red-500 hover:text-red-700 ml-2">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/sale" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4 inline-block">Añadir Venta</Link>
        </div>
    );
};

export default SaleList;
