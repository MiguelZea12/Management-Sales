import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SaleForm from './components/SaleForm';
import SaleList from './components/SaleList';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1">
          <header className="py-4 bg-gray-100 border-b border-gray-300">
            <h1 className="text-4xl font-bold text-center text-gray-800">Gestor de Ventas</h1>
          </header>
          <main className="my-8 mx-4">
            <Routes>
              <Route path="/clients" element={<ClientList />} />
              <Route path="/client/:id?" element={<ClientForm />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id?" element={<ProductForm />} />
              <Route path="/sales" element={<SaleList />} />
              <Route path="/sale/:id?" element={<SaleForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

const Sidebar: React.FC = () => (
  <div className="w-60 px-2 bg-gray-100 border-r">
    <h2 className="text-2xl py-5 text-center font-semibold mb-4 border-b border-gray-300">Menú</h2>
    <ul>
      <li><a href="/clients" className="block text-2xl py-5 border-b border-gray-300 font-bold py-2 border-b text-center text-gray-800 hover:bg-gray-200">Clientes</a></li>
      <li><a href="/products" className="block text-2xl py-5 border-b border-gray-300 font-bold py-2 border-b text-center text-gray-800 hover:bg-gray-200">Productos</a></li>
      <li><a href="/sales" className="block text-2xl py-5 border-b border-gray-300 font-bold py-2 border-b text-center text-gray-800 hover:bg-gray-200">Ventas</a></li>
    </ul>
  </div>
);

export default App;
