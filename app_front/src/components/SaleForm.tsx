import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SaleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState('Crear');
  const [sale, setSale] = useState({ id_client: '', date: '', status: false });
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      setFormTitle('Editar');
      axios.get(`/api/sales/${id}`).then((response) => {
        setSale(response.data);
      });
    }
    // Fetch all clients
    axios.get('/api/clients/')
      .then((response) => {
        setClients(response.data);
      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `/api/sales/${id}/edit` : '/api/sales/new';
    try {
      await axios[method](url, { ...sale, id_client: parseInt(sale.id_client) });
      navigate('/sales');
    } catch (error) {
      console.error('Error saving sale:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = event.target;
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : false;
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
          <label htmlFor="id_client" className="block text-gray-700">Cliente:</label>
          <select id="id_client" name="id_client" value={sale.id_client} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="">Seleccione un cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>{client.names}</option>
            ))}
          </select>
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
