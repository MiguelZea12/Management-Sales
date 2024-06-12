import React from 'react';
import List from './common/List';

const DetailList: React.FC = () => (
    <List
        apiUrl="/api/details"
        headers={['ID Detalle', 'ID Venta', 'ID Producto', 'Cantidad', 'Precio']}
        renderRow={(detail: any) => (
            <>
                <td className="text-center py-2">{detail.id}</td>
                <td className="text-center py-2">{detail.id_sale}</td>
                <td className="text-center py-2">{detail.product_name}</td>
                <td className="text-center py-2">{detail.count}</td>
                <td className="text-center py-2">{detail.price}</td>
            </>
        )}
        addUrl="/detail/new"
        title="Listado de Detalles de Venta"
    />
);

export default DetailList;
