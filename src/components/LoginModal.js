import React, { useState } from 'react';
import { Button, Modal, Form, Input, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const LoginModal = (props) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    // const [user, setUser] = useState({});
    const user = useSelector((state) => state?.auth?.user);
    const xxx = useSelector((state) => state);
    const login = (usrDtl) => fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usrDtl)
    })
        .then(res => res.json())
        .then(res => {
            setMessage(res.message);
            if (res.token) {
                setTimeout(() => {
                    dispatch({ type: 'LOGIN', payload: res });
                    props.handleCancel()
                }, 1000);
            };
        })

    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <Modal title="Login" open={props.isModalOpen} onCancel={props.handleCancel} footer={null}>
            {message ? <><Alert type="error" message={message} /><br /></> : user?.token ? <><Alert type="success" message={`Welcome, ${user.firstName} ${user.lastName}`} /><br /></> : null}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ username: "kminchelle", password: "0lelplR" }}
                onFinish={(loginDetal) => Object.keys(user).length ? logout() : login(loginDetal)}
                // onFinishFailed={() => console.log("aaaa", "failed")}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        {Object.keys(user).length ? "Logout" : "Login"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginModal;