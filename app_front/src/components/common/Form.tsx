import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface FormProps<T> {
    initialValues: T;
    apiUrl: string;
    formTitle: string;
    children: (formData: T, handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) => React.ReactNode;
    redirectUrl: string;
}

const Form = <T extends Record<string, any>>({ initialValues, apiUrl, formTitle, children, redirectUrl }: FormProps<T>) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<T>(initialValues);

    useEffect(() => {
        if (id) {
            axios.get(`${apiUrl}/${id}`)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [id, apiUrl]);
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const method = id ? 'put' : 'post';
        const url = id ? `${apiUrl}/${id}/edit` : `${apiUrl}/new`;
        axios[method](url, formData)
            .then(() => {
                navigate(redirectUrl);
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        const checked = (event.target as HTMLInputElement).checked;
        const nameParts = name.split('.');
        if (nameParts.length > 1) {
            setFormData((prevData) => ({
                ...prevData,
                [nameParts[0]]: {
                    ...prevData[nameParts[0]],
                    [nameParts[1]]: type === 'checkbox' ? checked : value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{formTitle}</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                {children(formData, handleChange)}
                <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
