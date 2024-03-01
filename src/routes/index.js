import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './HomePage';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Cart from './Cart';

const MyRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/productDetails" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
    </BrowserRouter>
)

export default MyRouter;