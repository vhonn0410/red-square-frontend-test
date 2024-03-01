// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GeneralLayout from '../components/GeneralLayout';
import { Pagination, Drawer, Flex, Typography, Input, Select, Form, Checkbox, Col, Row } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import ProductCard from '../components/ProductCard';
import { useNavigate } from "react-router-dom";

const sortByOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'priceLowToHigh', label: 'Price: Low to High' },
    { value: 'priceHighToLow', label: 'Price: High to Low' },
    { value: 'rateLowToHigh', label: 'Rate: Low to High' },
    { value: 'rateHighToLow', label: 'Rate: High to Low' },
];

// Defining the Product List Route
function ProductList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products?.products?.products);
    const queryParameters = new URLSearchParams(window.location.search);
    const [_products, set_products] = useState(products);
    const [productListConfig, setProductListConfig] = useState({ curPage: queryParameters.get("curPage") ?? 1, category: queryParameters.get("category") ?? "", search: queryParameters.get("search") ?? "" });
    const [openDrawer, setOpenDrawer] = useState(false);
    const [category, setCategory] = useState([]);
    const maxProducts = 10;
    // Fetching product data from an API
    useEffect(() => {
        if (!products)
            fetch('https://dummyjson.com/products')
                .then(res => res.json())
                .then(data => dispatch({ type: 'MODIFYPRODUCTS', payload: data }));
    }, [products]);

    // Fetching category data from an API
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategory(data));
    }, []);

    // Fetching category data from an API
    useEffect(() => {
        if (!window.location.search) {
            setProductListConfig({ curPage: 1, category: [], search: "" })
        }
    }, [window.location.search]);

    // product list handling
    useEffect(() => {
        if (products) {
            set_products((prev) => {
                // filter by category
                let __products = products.filter((p) => productListConfig?.category.length ? productListConfig?.category.includes(p.category) : p);
                // filter by search key
                if (productListConfig.search && productListConfig.search !== "")
                    __products = __products.filter((p) => p.category.toLowerCase().includes(productListConfig.search) || p.title.toLowerCase().includes(productListConfig.search) || p.description.toLowerCase().includes(productListConfig.search));
                // Sorting Handling
                if (productListConfig.sortBy === "priceLowToHigh")
                    __products = __products.sort((a, b) => a.price * (100 - a.discountPercentage) / 100 - b.price * (100 - b.discountPercentage) / 100);
                else if (productListConfig.sortBy === "priceHighToLow")
                    __products = __products.sort((a, b) => b.price * (100 - b.discountPercentage) / 100 - a.price * (100 - a.discountPercentage) / 100);
                else if (productListConfig.sortBy === "rateLowToHigh")
                    __products = __products.sort((a, b) => a.rating - b.rating);
                else if (productListConfig.sortBy === "rateHighToLow")
                    __products = __products.sort((a, b) => b.rating - a.rating);
                else {
                    if (productListConfig.search && productListConfig.search !== "") {
                        __products = __products.sort((a, b) => {
                            let countA = 0;
                            let countB = 0;
                            if (a.title.toLowerCase().includes(productListConfig.search)) countA += 1;
                            if (a.category.toLowerCase().includes(productListConfig.search)) countA += 1;
                            if (a.description.toLowerCase().includes(productListConfig.search)) countA += 1;
                            if (b.title.toLowerCase().includes(productListConfig.search)) countB += 1;
                            if (b.category.toLowerCase().includes(productListConfig.search)) countB += 1;
                            if (b.description.toLowerCase().includes(productListConfig.search)) countB += 1;

                            return countB - countA;
                        });
                    } else
                        __products = __products.sort((a, b) => a.id - b.id);
                }

                return __products;
            })
            const newUrl = Object.keys(productListConfig).map((k) => (`${k}=${productListConfig[k]}`))
            navigate(`/products?${newUrl.join("&")}`);
        }
    }, [products, productListConfig]);

    return (
        <GeneralLayout>
            {/* Pagination, Search, Sort By, Filter Icon */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={7}>
                    <Pagination current={productListConfig.curPage} total={_products.length} style={{ float: "left", marginLeft: "68px" }} onChange={(v) => setProductListConfig((a) => ({ ...a, curPage: v }))} />

                </Col>
                <Col className="gutter-row" span={7}>
                    <Input.Search placeholder="Search" onSearch={(v) => setProductListConfig((prev) => ({ ...prev, search: (v ?? "").toLowerCase(), curPage: 1 }))} />
                </Col>
                <Col className="gutter-row" span={8}>
                    <div style={{ display: "flex", alignItems: "center", float: "inline-end", marginRight: "28px" }}>
                        <Typography style={{ width: 80 }}>Sort By:</Typography>
                        <Select
                            defaultValue="relevance"
                            style={{ width: 180 }}
                            // allowClear
                            onChange={(v) => setProductListConfig((prev) => ({ ...prev, sortBy: v }))}
                            options={sortByOptions}
                        />
                    </div>
                </Col>
                <Col className="gutter-row" span={2}>
                    <FilterOutlined style={{ fontSize: "28px", marginLeft: "20px", border: "10px", borderColor: "black" }} onClick={() => setOpenDrawer(true)} />
                </Col>
            </Row>
            <br />
            {/* Product List Render */}
            <Flex gap="large" wrap="wrap" justify="center">
                {(_products.slice((productListConfig.curPage - 1) * maxProducts, productListConfig.curPage * maxProducts) ?? []).map(product => (
                    <div key={product.id} className="product">
                        <ProductCard product={product} dispatch={dispatch} useSelector={useSelector} />
                    </div>
                ))}
            </Flex>
            {/* Product List Filtering */}
            <Drawer title={<><FilterOutlined style={{ margin: "0 8px" }} />Filter</>} onClose={() => setOpenDrawer(false)} open={openDrawer}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.Item name="category" label="Category">
                        <Checkbox.Group onChange={(v) => setProductListConfig((a) => ({ ...a, category: v }))}>
                            <Row>
                                {category.map((c) =>
                                    <Col key={c}><Checkbox value={c} style={{ lineHeight: '32px', }}>{c}</Checkbox></Col>
                                )}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Drawer>
        </GeneralLayout>
    );
}

export default ProductList;