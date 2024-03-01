// Importing necessary libraries and components
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GeneralLayout from '../components/GeneralLayout';
import { Button, Typography, Table, Divider, Flex } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { getProductDetails } from "../tools/util";
import ProductQuantity from '../components/ProductQuantity';
import { modifyCart } from "../tools/util";

const getData = (cartItems, products, dispatch) => {

    const data = [];
    if (Object.keys(cartItems ?? {}).length) {
        Object.entries(cartItems ?? {}).forEach(([cKey, cValue]) => {
            const product = getProductDetails(products, cKey);
            if (product && cValue?.count) {
                const price = (Math.round(product.price * (100 - product.discountPercentage)) / 100).toFixed(2);
                data.push({
                    name: (<div style={{ display: "flex", alignItems: "center" }}>
                        <img src={product.thumbnail} style={{ height: "88px", marginRight: "28px" }} alt={product.title} />
                        <Typography style={{ display: "inline", fontSize: "26px", fontWeight: 'bold' }}>{product.title}</Typography>
                    </div>),
                    price: (<>
                        <Typography style={{ display: 'inline', color: "grey", textDecoration: 'line-through' }}>${product.price}</Typography>
                        <Typography style={{ color: "red", fontSize: "18px", fontWeight: 'bold', display: 'inline' }}> ${price}</Typography>
                    </>),
                    quantity: <ProductQuantity product={product} cartItems={cartItems} dispatch={dispatch} />,
                    total: <Typography style={{ color: "red", fontSize: "18px", fontWeight: 'bold', display: 'inline' }}> ${(price * cartItems[cKey]?.count).toFixed(2)}</Typography>,
                    totalAmount: price * cValue?.count,
                    delete: <CloseCircleOutlined onClick={(v) => modifyCart(product, 0, dispatch)} />,
                })
            }
        })
    }
    return data;
}
// Defining the Cart component
function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const products = useSelector((state) => state.products?.products?.products);
    const [totalItem,] = useState(Object.values(cartItems ?? {}).filter((v) => v.count).length);
    const [data, setData] = useState(getData(cartItems, products, dispatch));

    const columns = [
        {
            title: 'Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        Table.SELECTION_COLUMN,
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'x',
        },
    ];
    useEffect(() => {
        setData(getData(cartItems, products, dispatch));
    }, [cartItems, products, dispatch])
    return (
        <GeneralLayout>
            <Divider>{`Your Cart (${totalItem} ${totalItem <= 1 ? "item" : "items"})`}</Divider>
            <Table
                columns={columns}
                // rowSelection={{}}
                pagination={false}
                dataSource={data}
            />
            <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Typography style={{ marginRight: "100px", fontSize: "26px", fontWeight: 'bold' }}>Grand Total: ${Object.values(data ?? []).reduce((a, c) => a + c.totalAmount, 0).toFixed(2)}</Typography>
            </div>
            <Flex justify={"flex-end"} align={"center"} style={{ marginRight: "100px" }}>
                <Button size='large' type="primary">Checkout</Button>
            </Flex>

        </GeneralLayout>
    );
}

export default Cart;