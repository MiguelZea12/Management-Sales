import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

const DetailForm:  React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formTitle, setFormTitle] = useState('Crear');
    const [detail, setDetail] = useState({ id_detalle: '', venta: '', cliente: '', stock: '', price: '' });

    useEffect(() => {
        if (id) {
            setFormTitle('Editar');
            axios.get(`/api/details/${id}`).then((response) => {
                setDetail(response.data);
            }).catch(error => {
                console.error('Error fetching detail:', error);
            });
        }
    },[id]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `/api/details/${id}/edit` : '/api/details/new';
        axios[method](url, detail).then(()=> {
            navigate('/details');
        }).catch(error => {
            console.error('Error saving detail:', error);
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        setDetail((prevDetail) => ({
            ...prevDetail,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div>
            <h2 className="text-2x1 font-semibold mb4">{formTitle} detalle de ventas</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="id_detalle" className="block text-gray-700">ID Detalle:</label>
                    <input type="text" id="id_detalle" name="id_detalle" value={detail.id_detalle} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="venta" className="block text-gray-700">Venta:</label>
                    <input type="text" id="venta" name="venta" value={detail.venta} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="cliente" className="block text-gray-700">Cliente:</label>
                    <input type="text" id="cliente" name="cliente" value={detail.cliente} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-gray-700">Stock:</label>
                    <input type="text" id="stock" name="stock" value={detail.stock} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700">Price:</label>
                    <input type="text" id="price" name="price" value={detail.price} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
                </div>
            </form>
        </div>
    );
}

export default DetailForm;