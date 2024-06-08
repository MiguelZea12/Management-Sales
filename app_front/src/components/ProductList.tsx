import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Listado de Productos</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2">ID</th>
            <th className="w-1/6 py-2">Nombre</th>
            <th className="w-1/6 py-2">Descripción</th>
            <th className="w-1/6 py-2">Precio</th>
            <th className="w-1/6 py-2">Stock</th>
            <th className="w-1/6 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.map((product: any) => (
            <tr key={product.id}>
              <td className="text-center py-2">{product.id}</td>
              <td className="text-center py-2">{product.names}</td>
              <td className="text-center py-2">{product.descriptions}</td>
              <td className="text-center py-2">{product.price}</td>
              <td className="text-center py-2">{product.stock}</td>
              <td className="text-center py-2 space-x-2">
                <a href={`/product/${product.id}`} className="text-blue-500 hover:text-blue-700">Ver</a>
                <a href={`/product/${product.id}`} className="text-yellow-500 hover:text-yellow-700">Editar</a>
                <form method="POST" action={`/api/products/${product.id}`} style={{ display: 'inline' }}>
                  <button type="submit" className="text-red-500 hover:text-red-700">Eliminar</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/product" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4 inline-block">Añadir Producto</a>
    </div>
  );
};

export default ProductList;
