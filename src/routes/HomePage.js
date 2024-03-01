import React from 'react';
import GeneralLayout from '../components/GeneralLayout';
import shopping from "../images/shopping.png";
import { Button, Typography } from 'antd';
import { Link } from "react-router-dom";


const HomePage = (props) => (
    <GeneralLayout>
        <div className="background-container">
            <Typography className="overlay-content">
                Fast and Reliable Shipping<br />
                100% Satisfaction Guaranteed<br />
                Easy Returns and Exchanges<br />
                Secure Online Shopping<br />
            </Typography>
            <img src={shopping} alt="Background" style={{ width: "100%", height: "100%" }} />
            <Link to={"/products"}><Button size='large' className="overlay-button">Discover Now</Button></Link>
        </div>
    </GeneralLayout>
);
export default HomePage;