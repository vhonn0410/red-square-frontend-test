// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GeneralLayout from '../components/GeneralLayout';
import ProductDetails from '../components/ProductDetails';
import { getProductDetails } from "../tools/util"

// Defining the Product component
function ProductList() {
    const queryParameters = new URLSearchParams(window.location.search);
    const product_id = Number(queryParameters.get("product_id"));
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products?.products?.products);
    const [product, setProduct] = useState({})

    useEffect(() => {
        if (products && product_id) {
            setProduct(getProductDetails(products, product_id))
        }
    }, [product_id, products]);

    // Fetching product data from an API
    useEffect(() => {
        if (!products)
            fetch('https://dummyjson.com/products')
                .then(res => res.json())
                .then(data => dispatch({ type: 'MODIFYPRODUCTS', payload: data }));
    }, [products]);

    return (
        <GeneralLayout>
            <ProductDetails product={product} dispatch={dispatch} useSelector={useSelector} />
        </GeneralLayout>
    );
}

export default ProductList;