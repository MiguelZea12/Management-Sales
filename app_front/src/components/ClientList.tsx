import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientList: React.FC = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('/api/clients').then((response) => {
      setClients(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Listado de Clientes</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2">ID</th>
            <th className="w-1/6 py-2">Nombre</th>
            <th className="w-1/6 py-2">Email</th>
            <th className="w-1/6 py-2">Teléfono</th>
            <th className="w-1/6 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {clients.map((client: any) => (
            <tr key={client.id}>
              <td className="text-center py-2">{client.id}</td>
              <td className="text-center py-2">{client.names}</td>
              <td className="text-center py-2">{client.email}</td>
              <td className="text-center py-2">{client.telefono}</td>
              <td className="text-center py-2 space-x-2">
                <a href={`/client/${client.id}`} className="text-blue-500 hover:text-blue-700">Ver</a>
                <a href={`/client/${client.id}`} className="text-yellow-500 hover:text-yellow-700">Editar</a>
                <form method="POST" action={`/api/clients/${client.id}`} style={{ display: 'inline' }}>
                  <button type="submit" className="text-red-500 hover:text-red-700">Deshabilitar</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/client" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4 inline-block">Añadir Cliente</a>
    </div>
  );
};

export default ClientList;
