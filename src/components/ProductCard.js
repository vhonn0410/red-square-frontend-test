import React from 'react';
import { Card, Image, Typography, Rate, Badge, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import ProductQuantity from './ProductQuantity';

const getRibbonDtl = (product) => {
    if (product.discountPercentage > 15) {
        return { text: "Offer", color: "pink" }
    } else if (product.stock < 40) {
        return { text: "Limited Stock", color: "red" }
    } else {
        return { text: "", color: "none" }
    }
}

const ProductCard = ({ product, dispatch, useSelector }) => {
    const navigate = useNavigate();
    const { Title, Paragraph, Text } = Typography;
    const cartItems = useSelector((state) => state.cart.cartItems);
    const ribbonDtl = getRibbonDtl(product);

    return (
        <>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Badge.Ribbon {...ribbonDtl}>
                    <Card
                        style={{ width: 300, height: "auto" }}
                        hoverable
                        title={<div onClick={() => navigate(`/productDetails?product_id=${product.id}`)}>{product.title}</div>}
                        cover={<Image height={200} alt={product.title} src={product.images[0]} style={{ all: "inherit", padding: "0px 10px" }} />}
                        actions={[
                            // <MinusOutlined onClick={() => modifyCart(product, cartItems, cartItems?.[product.id]?.count ? cartItems?.[product.id]?.count - 1 : 0)} />,
                            // <Input type='number' variant="borderless" defaultValue={0} style={{ textAlign: "center" }} value={cartItems?.[product.id]?.count} onChange={(e) => modifyCart(product, cartItems, e?.target?.value ?? 0)} />,
                            // <PlusOutlined onClick={() => modifyCart(product, cartItems, cartItems?.[product.id]?.count ? cartItems?.[product.id]?.count + 1 : 1)} />,
                            // <div onClick={() => dispatch({ type: "ADDITEM", payload: { [product.id]: { count: cartItems?.[product.id]?.count ? cartItems?.[product.id]?.count + 1 : 1, id: product.id } } })}>Add to cart</div>,
                        ]}
                    >
                        <Typography onClick={() => navigate(`/productDetails?product_id=${product.id}`)}>
                            <Rate allowHalf disabled defaultValue={product.rating} style={{ fontSize: "20px", gap: "1px", margin: "0px", padding: "0px" }} />
                            <Typography display='inline' style={{ color: "red", fontSize: "26px", fontWeight: 'bold' }}>NOW: ${(Math.round(product.price * (100 - product.discountPercentage)) / 100).toFixed(2)}</Typography>
                            <Typography style={{ color: "grey", fontSize: "18px", textDecoration: 'line-through', display: 'inline' }}>${product.price}</Typography>
                            <Typography style={{ display: 'inline', fontSize: "18px", fontWeight: 'bold' }}> -{product.discountPercentage}%</Typography>
                            <Paragraph>

                                <ul>
                                    <li>Category: {product.category}</li>
                                    <li>Rating: {product.rating}/5</li>
                                </ul>
                            </Paragraph>
                        </Typography>
                        <ProductQuantity style={{ display: "flex" }} product={product} cartItems={cartItems} dispatch={dispatch} />
                    </Card>
                </Badge.Ribbon>
            </Space>
        </>

    )
};
export default ProductCard;