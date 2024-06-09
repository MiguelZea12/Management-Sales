import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/clients/')
      .then((response) => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (id === undefined) {
      console.error('Error: Client ID is undefined');
      return;
    }
  
    try {
      await axios.delete(`/api/clients/${id}/delete`);
      setClients(prevClients => prevClients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Listado de Clientes</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2">Nombre</th>
            <th className="w-1/6 py-2">Email</th>
            <th className="w-1/6 py-2">Teléfono</th>
            <th className="w-1/6 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {clients.map((client: any, index: number) => (
            <tr key={client.id || index}>
              <td className="text-center py-2">{client.names}</td>
              <td className="text-center py-2">{client.email}</td>
              <td className="text-center py-2">{client.telefono}</td>
              <td className="text-center py-2 space-x-2">
                <Link to={`/client/${client.id}`} className="text-blue-500 hover:text-blue-700">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link to={`/client/${client.id}/edit`} className="text-yellow-500 hover:text-yellow-700">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button onClick={() => handleDelete(client.id)} className="text-red-500 hover:text-red-700">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/client/new" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4 inline-block">
        Añadir Cliente
      </Link>
    </div>
  );
};

export default ClientList;
