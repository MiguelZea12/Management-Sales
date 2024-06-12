import React from 'react';
import Form from './common/Form';

const initialProduct = { names: '', descriptions: '', price: 0, stock: 0, status: false };

const ProductForm: React.FC = () => (
    <Form initialValues={initialProduct} apiUrl="/api/products" formTitle="Producto" redirectUrl="/products">
        {(product, handleChange) => (
            <>
                <div className="mb-4">
                    <label htmlFor="names" className="block text-gray-700">Nombre:</label>
                    <input type="text" id="names" name="names" value={product.names} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="descriptions" className="block text-gray-700">Descripción:</label>
                    <input type="text" id="descriptions" name="descriptions" value={product.descriptions} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700">Precio:</label>
                    <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-gray-700">Stock:</label>
                    <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700">Estado:</label>
                    <input type="checkbox" id="status" name="status" checked={product.status} onChange={handleChange} />
                </div>
            </>
        )}
    </Form>
);

export default ProductForm;
