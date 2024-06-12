import React from 'react';
import Form from './common/Form';

const initialDetail = { id_detalle: '', id_sale: '', id_client: '', count: '', price: '' };

const DetailForm: React.FC = () => (
    <Form initialValues={initialDetail} apiUrl="/api/details" formTitle="Detalle de ventas" redirectUrl="/details">
        {(detail, handleChange) => (
            <>
                <div className="mb-4">
                    <label htmlFor="id_sale" className="block text-gray-700">Venta:</label>
                    <input type="text" id="id_sale" name="id_sale" value={detail.id_sale} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="id_client" className="block text-gray-700">Cliente:</label>
                    <input type="text" id="id_client" name="id_client" value={detail.id_client} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="count" className="block text-gray-700">Stock:</label>
                    <input type="text" id="count" name="count" value={detail.count} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700">Price:</label>
                    <input type="text" id="price" name="price" value={detail.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
            </>
        )}
    </Form>
);

export default DetailForm;
