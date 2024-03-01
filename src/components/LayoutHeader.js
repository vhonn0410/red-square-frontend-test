import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
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
            <ShoppingCartOutlined className='headerItem' style={{ backgroundColor: "white", fontSize: '32px' }} onClick={() => navigate(`/cart`)} />

            <LoginModal isModalOpen={isModalOpen} handleCancel={() => setIsModalOpen(false)} />
        </Header>

    )
};
export default LayoutHeader;