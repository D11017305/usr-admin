import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from "@mui/material";
import "./menu.css";
import logoImage from "./logo.png";
import Carousel from "../module/carousel/screen/Carousel";
import CarouselAdd from './carousel/screen/CarouselAdd';
import Activity from "../module/activity/screen/Activity";
import Service from "../module/service/screen/service";
import News from "../module/news/screen/News";


export default function BasicRoutor() {


    // const [anchorEl, setAnchorEl] = useState(null);
    // const [articleAnchorEl, setArticleAnchorEl] = useState(null);
    // const [caseAnchorEl, setCaseAnchorEl] = useState(null);
    // const [LohasCarbonDotAnchorEl, setLohasCarbonDotAnchorEl] = useState(null);
    // const [ChillaxAnchorEl, setChillaxAnchorEl] = useState(null);
    // const [linkAnchorEl, setLinkAnchorEl] = useState(null);
    // const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    const menuItems = [
        { name: '輪播圖', path: '/carousel' },
        { name: '成果展現', path: '/achievements' },
        { name: '服務足跡', path: '/service-footprints' },
        { name: '亮點報導', path: '/highlights' },
        { name: '重要連結', path: '/important-links' },
    ];



    return (
        <>
            <div>

                <div className="top-container">
                    <img src={logoImage} alt="logo" className="logo-main" />
                    <div className="line"></div>
                </div>
                <div className="body-container">
                    <div className="left-menu">
                        <ul className="menu-list">
                            {menuItems.map((item, index) => (
                                <li key={index} className="menu-item">
                                    <Button
                                        component={Link}
                                        to={item.path}
                                        variant="text"
                                        style={{ color: "black", fontSize: '18px' }}
                                    >
                                        {item.name}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="right-content">
                        <Routes>
                            <Route path="/carousel" element={<Carousel />} />
                            <Route path="/carousel/add" element={<CarouselAdd />} />
                            <Route path="/activities" element={<Activity />} />
                            <Route path="/services" element={<Service />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/links" element={<Link />} />
                        </Routes>
                    </div>
                </div>

            </div>
        </>
    );
}
