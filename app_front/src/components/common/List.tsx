import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface ListProps<T> {
    apiUrl: string;
    appUrl: string;
    headers: string[];
    renderRow: (item: T) => React.ReactNode;
    addUrl: string;
    title: string;
}

const List = <T extends { id: number | string }>({ apiUrl, appUrl, headers, renderRow, addUrl, title }: ListProps<T>) => {
    const [items, setItems] = useState<T[]>([]);

    useEffect(() => {
        axios.get(apiUrl)
            .then((response) => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [apiUrl]);

    const handleDelete = async (id: number | string) => {
        try {
            await axios.delete(`${apiUrl}/${id}/delete`);
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        {headers.map(header => (
                            <th key={header} className="w-1/6 py-2">{header}</th>
                        ))}
                        <th className="w-1/6 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {items.map((item) => (
                        <tr key={item.id}>
                            {renderRow(item)}
                            <td className="text-center py-2 space-x-2">
                                <Link to={`${appUrl}/${item.id}`} className="text-blue-500 hover:text-blue-700">
                                    <FontAwesomeIcon icon={faEye} />
                                </Link>
                                <Link to={`${appUrl}/${item.id}/edit`} className="text-yellow-500 hover:text-yellow-700 ml-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 ml-2">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={addUrl} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4 inline-block">
                Añadir
            </Link>
        </div>
    );
};

export default List;
