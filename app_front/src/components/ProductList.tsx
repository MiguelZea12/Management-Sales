import React from 'react';
import List from './common/List';

const ProductList: React.FC = () => (
    <List
        apiUrl="/api/products"
        appUrl='/products'
        headers={['Nombre', 'Descripción', 'Precio', 'Stock']}
        renderRow={(product: any) => (
            <>
                <td className="text-center py-2">{product.names}</td>
                <td className="text-center py-2">{product.descriptions}</td>
                <td className="text-center py-2">{product.price}</td>
                <td className="text-center py-2">{product.stock}</td>
            </>
        )}
        addUrl="/products/new"
        title="Listado de Productos"
    />
);

export default ProductList;
