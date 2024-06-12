import React from 'react';
import Form from './common/Form';

const initialClient = { names: '', email: '', telefono: '', status: false };

const ClientForm: React.FC = () => (
    <Form initialValues={initialClient} apiUrl="/api/clients/" formTitle="Cliente" redirectUrl="/clients">
        {(client, handleChange) => (
            <>
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
            </>
        )}
    </Form>
);

export default ClientForm;
