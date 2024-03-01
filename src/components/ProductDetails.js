import React from 'react';
import { Image, Typography, Rate, Col, Row, Tabs, Descriptions } from 'antd';
import ProductQuantity from './ProductQuantity';

const ProductDetails = ({ product, dispatch, useSelector }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [productDetails, setProductDetails] = React.useState();
    const [rate, setRate] = React.useState(product.rating);
    const getProductDesc = (product) => {
        return ([
            {
                label: 'Product',
                children: product.title,
                span: 3,
            },
            {
                label: 'Price',
                children: <>
                    <Typography display='inline' style={{ display: 'inline', color: "grey", textDecoration: 'line-through', display: 'inline' }}>${product.price}</Typography>
                    <Typography display='inline' style={{ color: "red", fontSize: "18px", fontWeight: 'bold', display: 'inline' }}> ${(Math.round(product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}</Typography>
                </>,
                span: 3,
            },
            {
                label: 'Discount',
                children: product.discountPercentage + '%',
                span: 3,
            },
            {
                label: 'Brand',
                children: product.brand,
                span: 3,
            },
            {
                label: 'Category',
                children: product.category,
                span: 3,
            },
            {
                label: 'Rating',
                children: <Rate allowHalf disabled value={rate} style={{ fontSize: "20px", gap: "1px", margin: "0px", padding: "0px" }} />,
                span: 3,
            },
            {
                label: 'Stock',
                children: product.stock,
                span: 3,
            },
            {
                label: 'Description',
                children: product.description,
                span: 3,
            },
        ]
        )
    }
    React.useEffect(() => {
        if (product) {
            setProductDetails(getProductDesc(product))
            setRate(product.rating)
        }
    }, [product, rate])

    return (
        <>
            {productDetails && rate && <Row>
                <Col span={14}>
                    <Tabs
                        tabPosition={"left"}
                        tabBarStyle={{ margin: 0, padding: 0 }}
                        items={(product.images ?? []).map((v, i) => {
                            const id = String(i + 1);
                            return {
                                label: <Image height={38} preview={false} alt={product.title} src={product.images[i]} />,
                                key: id,
                                children: <Image preview={false} sty alt={product.title} src={product.images[i]} />,
                            };
                        })}
                    />
                </Col>
                <Col span={10}>
                    <Descriptions bordered items={productDetails} />
                    <ProductQuantity style={{ marginTop: "50px", float: "right", width: "75%" }} product={product} cartItems={cartItems} dispatch={dispatch} />
                </Col>
            </Row>
            }
        </>
    )
};
export default ProductDetails;