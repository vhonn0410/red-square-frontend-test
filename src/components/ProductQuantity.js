// Importing necessary libraries and components
import React from 'react';
import { Input, Radio } from 'antd';
import { modifyCart } from "../tools/util";

const ProductQuantity = ({ product, cartItems, dispatch, style }) => (
    <Radio.Group style={style}>
        <Radio.Button onClick={() => modifyCart(product, (cartItems?.[product.id]?.count ?? 0) - 1, dispatch)}>-</Radio.Button>
        <Radio.Button>
            <Input type='number' variant="borderless" defaultValue={0} style={{ textAlign: "center" }} value={cartItems?.[product.id]?.count} onChange={(e) => modifyCart(product, e?.target?.value ?? 0, dispatch)} />
        </Radio.Button>
        <Radio.Button onClick={() => modifyCart(product, (cartItems?.[product.id]?.count ?? 0) + 1, dispatch)}>+</Radio.Button>
    </Radio.Group>
);
export default ProductQuantity;