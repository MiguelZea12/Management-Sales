import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ClientForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState('Crear');
  const [client, setClient] = useState({ names: '', email: '', telefono: '', status: false });

  useEffect(() => {
    if (id) {
      setFormTitle('Editar');
      axios.get(`/api/clients/${id}`).then((response) => {
        setClient(response.data);
      });
    }
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `/api/clients/${id}` : '/api/clients';
    axios[method](url, client).then(() => {
      navigate('/clients');
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{formTitle} Cliente</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="names" className="block text-gray-700">Nombre:</label>
          <input type="text" id="names" name="names" value={client.names} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email:</label>
          <input type="email" id="email" name="email" value={client.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700">Teléfono:</label>
          <input type="text" id="telefono" name="telefono" value={client.telefono} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">Estado:</label>
          <input type="checkbox" id="status" name="status" checked={client.status} onChange={handleChange} />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
