import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../style/LinkAdd.css";

export default function CarouselAdd() {

    const navigate = useNavigate(); // 使用 useNavigate hook
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [startDate, setStartDate] = useState(new Date());


    useEffect(() => {
        if (files.length > 0) {
            const previewUrls = files.map(file => URL.createObjectURL(file));
            setPreviews(previewUrls);
            return () => previewUrls.forEach(url => URL.revokeObjectURL(url));
        } else {
            setPreviews([]);
        }
    }, [files]);

    const handleRedirect = () => {
        navigate('/links'); // 將 '/home' 替換為你想要的重定向路徑
    };

    return (
        <div className='activity'>
            <div className='add-input'>
                <h3>連結名稱：</h3>
                <input type="text" placeholder="請輸入報導名稱" className='add-input-text'></input>
            </div>

            <div className='add-input'>
                <h3>連結：</h3>
                <input type="text" placeholder="請輸入連結" className='add-input-text'></input>
            </div>

            <div className='carousel-btn'>
                <Button variant="contained" style={{ backgroundColor: '#ECE6F0', color: 'black', marginRight: '30px' }}>確定新增</Button>
                <Button variant="contained" style={{ backgroundColor: '#ECE6F0', color: 'black' }} onClick={handleRedirect}>取消新增</Button>
            </div>
        </div>
    );
}