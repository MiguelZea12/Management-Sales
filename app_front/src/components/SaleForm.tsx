import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SaleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState('Crear');
  const [sale, setSale] = useState({ id_client: '', date: '', status: false });

  useEffect(() => {
    if (id) {
      setFormTitle('Editar');
      axios.get(`/api/sales/${id}`).then((response) => {
        setSale(response.data);
      });
    }
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `/api/sales/${id}` : '/api/sales';
    axios[method](url, sale).then(() => {
      navigate('/sales');
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setSale((prevSale) => ({
      ...prevSale,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{formTitle} Venta</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="id_client" className="block text-gray-700">ID Cliente:</label>
          <input type="number" id="id_client" name="id_client" value={sale.id_client} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">Fecha:</label>
          <input type="date" id="date" name="date" value={sale.date} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">Estado:</label>
          <input type="checkbox" id="status" name="status" checked={sale.status} onChange={handleChange} />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default SaleForm;
