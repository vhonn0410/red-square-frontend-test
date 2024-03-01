import React from 'react';
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import LayoutHeader from './LayoutHeader';

const { Footer, Content } = Layout;

const GeneralLayout = ({ children }) => (
    <Layout className='general'>
        <LayoutHeader />
        <Content style={{ padding: '48px' }}><div className='contentDiv'>{children}</div></Content>
        <Footer className='footer'><CopyrightOutlined /> Copyright {new Date().getFullYear()}</Footer>
    </Layout>
);
export default GeneralLayout;