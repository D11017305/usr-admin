import { Button } from "@mui/material";
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Home from "../_basic/components/index";
import Activity from "../module/activity/screen/Activity";
import Carousel from "../module/carousel/screen/Carousel";
import News from "../module/news/screen/News";
import Service from "../module/service/screen/service";
import HomeMap from "./homemap/screen/HomeMap";
import ImportantLink from "./importLink/srceen/ImportLink";
import logoImage from "./logo.png";
import "./menu.css";
import Partner from "./partner/screen/partner";
import Report from "./report/screen/Report";


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
        { name: '成果展現', path: '/activity' },
        { name: '亮點報導', path: '/news' },
        { name: '重要連結', path: '/links' },
        { name: '服務足跡', path: '/services' },
        { name: '合作夥伴', path: '/partner' },
        { name: '年度報告', path: '/report' },
        { name: '首頁地圖', path: '/homemap'}
        // { name: '入站人數', path: '/traffic'},
    ];



    return (
        <>
            <div>
                <div className="top-container">
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <img src={logoImage} alt="logo" className="logo-main" />
                    </Link>

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
                            <Route path="/" element={<Home />} />
                            <Route path="/carousel/*" element={<Carousel />} />
                            <Route path="/activity/*" element={<Activity />} />
                            <Route path="/services/*" element={<Service />} />
                            <Route path="/news/*" element={<News />} />
                            <Route path="/links/*" element={<ImportantLink />} />
                            <Route path="/partner/*" element={<Partner />} />
                            <Route path="/report/*" element={<Report />} />
                            <Route path="/homemap/*" element={<HomeMap/>}/>
                            {/* <Route path="/traffic" element={<Traffic />} /> */}
                        </Routes>
                    </div>
                </div>

            </div>
        </>
    );
}
