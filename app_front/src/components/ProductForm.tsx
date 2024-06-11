import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formTitle, setFormTitle] = useState('Crear');
    const [product, setProduct] = useState({
        names: '',
        descriptions: '',
        price: 0,
        stock: 0,
        status: false
    });

    useEffect(() => {
        if (id) {
            setFormTitle('Editar');
            axios.get(`/api/products/${id}`).then((response) => {
                const data = response.data;
                setProduct({
                    names: data.names || '',
                    descriptions: data.descriptions || '',
                    price: data.price ?? 0,
                    stock: data.stock ?? 0,
                    status: data.status ?? false
                });
            }).catch(error => {
                console.error('Error fetching product:', error);
            });
        }
    }, [id]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `/api/products/${id}/edit` : '/api/products/new';
        axios[method](url, product).then(() => {
            navigate('/products');
        }).catch(error => {
            console.error('Error saving product:', error);
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{formTitle} Producto</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
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
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;