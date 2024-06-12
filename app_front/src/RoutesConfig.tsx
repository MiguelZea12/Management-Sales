import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SaleForm from "./components/SaleForm";
import SaleList from "./components/SaleList";
import DetailList from "./components/DetailList";
import DetailForm from "./components/DetailForm";

const RoutesConfig: React.FC = () => {
    return (
        <Routes>
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id/edit" element={<ClientForm />} />
            <Route path="/clients/:id" element={<ClientForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductForm />} />
            <Route path="/sales" element={<SaleList />} />
            <Route path="/sales/new" element={<SaleForm />} />
            <Route path="/sales/:id?" element={<SaleForm />} />
            <Route path="/sales/:id/edit" element={<SaleForm />} />
            <Route path="/details" element={<DetailList />} />
            <Route path="/detail/new" element={<DetailForm />} />
            <Route path="/detail/:id/edit" element={<DetailForm />} />
            <Route path="/detail/:id" element={<DetailForm />} />
        </Routes>
    );
};


export default RoutesConfig;