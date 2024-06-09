import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SaleForm from './components/SaleForm';
import SaleList from './components/SaleList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faCashRegister, faBars } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="py-0 bg-sky-950 border-b border-gray-300">
            <div className="flex items-center justify-between h-16 px-4">
              
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/clients" element={<ClientList />} />
              <Route path="/client/new" element={<ClientForm />} />
              <Route path="/client/:id/edit" element={<ClientForm />} />
              <Route path="/client/:id" element={<ClientForm />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
              <Route path="/products/:id" element={<ProductForm />} />
              <Route path="/sales" element={<SaleList />} />
              <Route path="/sale/new" element={<SaleForm />} />
              <Route path="/sale/:id?" element={<SaleForm />} />
              <Route path="/sale/:id/edit" element={<SaleForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative h-full transition-all duration-200 bg-zinc-700 border-r ${isExpanded ? 'w-60' : 'w-16'}`} onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
      <div className="flex items-center justify-center h-16">
        <FontAwesomeIcon icon={faBars} className="text-2xl text-zinc-300" />
      </div>
      <ul>
        <li>
          <a href="/clients" className="flex items-center space-x-2 px-4 py-5 hover:bg-gray-200">
            <FontAwesomeIcon icon={faUsers} className="text-2xl text-zinc-300" /> 
            {isExpanded && <span className="text-lg text-zinc-300">Clientes</span>}
          </a>
        </li>
        <li>
          <a href="/products" className="flex items-center space-x-2 px-4 py-5 hover:bg-gray-200">
            <FontAwesomeIcon icon={faBoxOpen} className="text-2xl text-zinc-300" />
            {isExpanded && <span className="text-lg text-zinc-300">Productos</span>}
          </a>
        </li>
        <li>
          <a href="/sales" className="flex items-center space-x-2 px-4 py-5 hover:bg-gray-200">
            <FontAwesomeIcon icon={faCashRegister} className="text-2xl text-zinc-300" />
            {isExpanded && <span className="text-lg text-zinc-300">Ventas</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default App;
