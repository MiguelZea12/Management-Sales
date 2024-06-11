import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DetailList: React.FC = () => {
    const [details, setDetails] = useState<any[]>([]);

    useEffect(() => {
        axios.get("/api/details/")
            .then((response) => {
                setDetails(response.data);
            })
            .catch((error) => {
                console.error("Error fetching details:", error);
            });
    }, []);

    const handleDelete = async (id: number) => {
        if (id === undefined) {
            console.error("Error: Detail ID is undefined");
            return;
        }

        try {
            await axios.delete(`/api/details/${id}`);
            setDetails((prevDetails) => prevDetails.filter((detail) => detail.id !== id));
        } catch (error) {
            console.error("Error deleting detail:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Lista de ventas</h2>
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/6 py-2">ID Detalle</th>
                        <th className="w-1/6 py-2">ID Venta</th>
                        <th className="w-1/6 py-2">ID Producto</th>
                        <th className="w-1/6 py-2">Cantidad</th>
                        <th className="w-1/6 py-2">Precio</th>
                        <th className="w-1/6 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {details.map((detail: any, index: number) => (
                        <tr key={index}>
                            <td className="text-center py-2">{detail.id}</td>
                            <td className="text-center py-2">{detail.id_sale}</td>
                            <td className="text-center py-2">{detail.id_product}</td>
                            <td className="text-center py-2">{detail.count}</td>
                            <td className="text-center py-2">{detail.price}</td>
                            <td className="text-center py-2 space-x-2">
                                <Link to={`/detail/${detail.id}`} className="text-blue-500 hover:text-blue-700">
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                                <Link to={`/detail/${detail.id}/edit`} className="text-yellow-500 hover:text-yellow-700">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <button onClick={() => handleDelete(detail.id)} className="text-red-500 hover:text-red-700">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/detail/new" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4 inline-block">
                Añadir detalle
            </Link>
        </div>
    );
};

export default DetailList;
