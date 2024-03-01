import React, { useState } from 'react';
import { Layout, Menu, Typography, Badge } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, LoginOutlined } from '@ant-design/icons';
import LoginModal from './LoginModal';
import { useSelector } from 'react-redux';

const { Header } = Layout;
const navItems = [{ label: 'Home', link: "/" }, { label: 'All Products', link: "/products" }].map((obj, i) => ({
    i,
    label: <Link to={obj.link}>{obj.label}</Link>,
}));

const LayoutHeader = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((state) => state?.auth?.user);
    const cartItems = useSelector((state) => state.cart.cartItems);

    return (
        <Header className='header'>
            <Menu
                mode="horizontal"
                className='headerItem'
                items={navItems}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />
            <LoginOutlined style={{ backgroundColor: "white", fontSize: '32px' }} onClick={() => setIsModalOpen(true)} /><Typography style={{ margin: "auto 10px" }}>{Object.keys(user).length ? `${user?.firstName} ${user?.lastName}` : "LOGIN"}</Typography>
            <div style={{ display: "flex", marginTop: "18px", marginRight: "38px" }} >
                <Badge count={Object.values(cartItems ?? {}).filter((v) => v.count).length} style={{ marginTop: "2px", marginRight: "38px", cursor: "context-menu" }}>
                    <ShoppingCartOutlined className='headerItem' style={{ backgroundColor: "white", fontSize: '32px', padding: 0 }} onClick={() => navigate(`/cart`)} />
                </Badge>
            </div>
            <LoginModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} />
        </Header>

    )
};
export default LayoutHeader;