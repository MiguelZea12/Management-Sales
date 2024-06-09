import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (id === undefined) {
      console.error('Error: Product ID is undefined');
      return;
    }
  
    try {
      await axios.delete(`/api/products/${id}/delete`);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Listado de Productos</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2">Nombre</th>
            <th className="w-1/6 py-2">Descripción</th>
            <th className="w-1/6 py-2">Precio</th>
            <th className="w-1/6 py-2">Stock</th>
            <th className="w-1/6 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {products.map((product: any, index: number) => (
            <tr key={product.id || index}>
              <td className="text-center py-2">{product.names}</td>
              <td className="text-center py-2">{product.descriptions}</td>
              <td className="text-center py-2">{product.price}</td>
              <td className="text-center py-2">{product.stock}</td>
              <td className="text-center py-2 space-x-2">
                <Link to={`/products/${product.id}`} className="text-blue-500 hover:text-blue-700">
                  <FontAwesomeIcon icon={faEye} />
                </Link>
                <Link to={`/products/${product.id}/edit`} className="text-yellow-500 hover:text-yellow-700">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <Link to="/products/new" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4 inline-block">
        Añadir Producto
      </Link>
    </div>
  );
};

export default ProductList;
