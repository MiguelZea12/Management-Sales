import React, { useState, useEffect } from 'react';
import Form from './common/Form';
import axios from 'axios';

const initialSale = { id: '', id_client: '', date: '', status: false };
const initialDetail = { id_product: '', count: '', price: '' };

const SaleForm: React.FC = () => {
    const [clients, setClients] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/clients/')
            .then((response) => {
                setClients(response.data || []);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
            });

        axios.get('/api/products/')
            .then((response) => {
                setProducts(response.data || []);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <Form initialValues={initialSale} apiUrl="/api/sales" formTitle="Venta" redirectUrl="/sales">
            {(sale, handleChange) => (
                <>
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
                    <h2 className="text-2xl font-semibold mb-4">Detalles de la venta</h2>
                    <Form initialValues={initialDetail} apiUrl={`/api/sales/${sale.id}/details`} formTitle="Detalle de venta" redirectUrl="/sales">
                        {(detail, handleChange) => (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="id_product" className="block text-gray-700">Producto:</label>
                                    <select id="id_product" name="id_product" value={detail.id_product} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                                        <option value="">Seleccione un producto</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>{product.names}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="count" className="block text-gray-700">Cantidad:</label>
                                    <input type="number" id="count" name="count" value={detail.count} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="block text-gray-700">Precio:</label>
                                    <input type="text" id="price" name="price" value={detail.price} onChange ={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                                </div>
                            </>
                        )}
                    </Form>
                </>
            )}
        </Form>
    );
};

export default SaleForm;
