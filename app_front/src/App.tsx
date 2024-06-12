import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './RoutesConfig';
import SideBar from './components/SideBar';
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-red">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <header className="py-0 bg-sky-950 border-b border-gray-300">
            <div className="flex items-center justify-between h-16 px-4 bg-red">
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4">
            <RoutesConfig />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;