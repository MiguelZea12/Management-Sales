import React from 'react';
import List from './common/List';

const ClientList: React.FC = () => (
    <List
        apiUrl="/api/clients"
        appUrl="/clients"
        headers={['Nombre', 'Email', 'Teléfono']}
        renderRow={(client: any) => (
            <>
                <td className="text-center py-2">{client.names}</td>
                <td className="text-center py-2">{client.email}</td>
                <td className="text-center py-2">{client.telefono}</td>
            </>
        )}
        addUrl="/clients/new"
        title="Listado de Clientes"
    />
);

export default ClientList;


