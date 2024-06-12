import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SaleForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formTitle, setFormTitle] = useState('Crear');
    const [sale, setSale] = useState({ id_client: '', date: '', status: false });
    const [detail, setDetail] = useState({ id_product: '', count: '', price: '' });
    const [originalPrice, setOriginalPrice] = useState('');
    const [clients, setClients] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            setFormTitle('Editar');
            axios.get(`/api/sales/${id}`)
                .then((response) => {
                    setSale({
                        id_client: response.data.id_client || '',
                        date: response.data.date || '',
                        status: response.data.status || false
                    });
                    return axios.get(`/api/sales/${id}/details`);
                })
                .then((detailResponse) => {
                    setDetail({
                        id_product: detailResponse.data[0]?.id_product || '',
                        count: detailResponse.data[0]?.count || '',
                        price: detailResponse.data[0]?.price || ''
                    });
                })
                .catch((error) => {
                    console.error('Error fetching sale details:', error);
                });
        }
    
        axios.all([axios.get('/api/clients/'), axios.get('/api/products/')])
            .then(axios.spread((clientsResponse, productsResponse) => {
                setClients(clientsResponse.data || []);
                setProducts(productsResponse.data || []);
            }))
            .catch(error => {
                console.error('Error fetching clients and products:', error);
            });
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const method = id ? 'put' : 'post';
            const url = id ? `/api/sales/${id}/edit` : '/api/sales/new';

            const requestData = {
                id_client: sale.id_client,
                date: sale.date,
                status: sale.status,
                details: [detail] 
            };

            const response = await axios[method](url, requestData);
            console.log('Sale saved:', response.data);
            navigate('/sales');
        } catch (error) {
            console.error('Error saving sale:', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target as HTMLInputElement;
        const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value === 'true';

        if (name === 'id_client' || name === 'date') {
            const formattedDate = type === 'date' ? value.split('T')[0] : value;
            setSale(prevSale => ({
                ...prevSale,
                [name]: formattedDate,
            }));
        } else if (name === 'status') {
            setSale(prevSale => ({
                ...prevSale,
            [name]: type === 'checkbox' ? checked : checked === true,
            }));
        } else if (name === 'id_product') {
            const selectedProduct = products.find(product => product.id === parseInt(value));
            const price = selectedProduct ? selectedProduct.price : '';
            setOriginalPrice(price);
            setDetail(prevDetail => ({
                ...prevDetail,
                [name]: value,
                price: price
            }));
        } else if (name === 'count') {
            const total = (value && detail.price) ? (parseFloat(value) * parseFloat(originalPrice)).toFixed(2) : originalPrice;
            setDetail(prevDetail => ({
                ...prevDetail,
                [name]: value,
                price: total
            }));
        } else {
        setDetail(prevDetail => ({
                ...prevDetail,
                [name]: value,
            }));
        }
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
                <h2 className="text-2xl font-semibold mb-4">Detalles de la venta</h2>
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
                    <label htmlFor="price" className="block text-gray-700">Precio Total:</label>
                    <input type="text" id="price" name="price" value={detail.price} readOnly className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default SaleForm;
