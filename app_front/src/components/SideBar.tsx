import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBoxOpen, faCashRegister, faBars, faFileText } from '@fortawesome/free-solid-svg-icons';

const SideBar: React.FC = () => {
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
            {isExpanded && <span className="text-xl text-zinc-300">Clientes</span>}
          </a>
        </li>
        <li>
          <a href="/products" className="flex items-center space-x-2 px-4 py-5 hover:bg-gray-200">
            <FontAwesomeIcon icon={faBoxOpen} className="text-2xl text-zinc-300" />
            {isExpanded && <span className="text-xl text-zinc-300">Productos</span>}
          </a>
        </li>
        <li>
          <a href="/sales" className="flex items-center space-x-2 px-5 py-5 hover:bg-gray-200">
            <FontAwesomeIcon icon={faCashRegister} className="text-2xl text-zinc-300" />
            {isExpanded && <span className="text-xl text-zinc-300">Ventas</span>}
          </a>
        </li>
        <li>
          <a href="/details" className='flex items-center space-x-2 px-6 py-5 hover:bg-gray-200'>
            <FontAwesomeIcon icon={faFileText} className='text-2xl text-zinc-300'></FontAwesomeIcon>
            {isExpanded && <span className='text-xl text-zinc-300'>Detalles</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;