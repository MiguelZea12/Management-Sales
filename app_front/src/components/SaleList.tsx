import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SaleList: React.FC = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get('/api/sales').then((response) => {
      setSales(response.data);
    });
  }, []);

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
              <td className="text-center py-2">{sale.id_client}</td>
              <td className="text-center py-2">{sale.date}</td>
              <td className="text-center py-2">
                <a href={`/sale/${sale.id}`} className="text-blue-500 hover:text-blue-700">Ver</a>
                <a href={`/sale/${sale.id}`} className="text-yellow-500 hover:text-yellow-700">Editar</a>
                <form method="POST" action={`/api/sales/${sale.id}`} style={{ display: 'inline' }}>
                  <button type="submit" className="text-red-500 hover:text-red-700">Eliminar</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/sale" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4 inline-block">Añadir Venta</a>
    </div>
  );
};

export default SaleList;
