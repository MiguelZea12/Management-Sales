import React from 'react';
import List from './common/List';

const SaleList: React.FC = () => (
    <List
        apiUrl="/api/sales"
        headers={['ID', 'Cliente', 'Fecha']}
        renderRow={(sale: any) => (
            <>
                <td className="text-center py-2">{sale.id}</td>
                <td className="text-center py-2">{sale.client_name}</td>
                <td className="text-center py-2">{new Date(sale.date).toLocaleDateString()}</td>
            </>
        )}
        addUrl="/sales/new"
        title="Listado de Ventas"
    />
);

export default SaleList;
