import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../style/ServiceAdd.css";

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
        navigate('/service'); // 將 '/home' 替換為你想要的重定向路徑
    };

    return (
        <div className='activity'>
            <div className='add-input'>
                <h3>標題：</h3>
                <input type="text" placeholder="請輸入標題" className='add-input-text'></input>
            </div>
            <div className='add-input-2'>
                <h3>圖片<span>(檔案大小請勿超過10MB)</span>：</h3>
                <input
                    type='file'
                    accept='image/jpg,image/jpeg,image/png'
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            console.log(e.target.files); // 調試輸出
                            setFiles(Array.from(e.target.files)); // 將 FileList 轉換為數組
                        } else {
                            console.log("沒有選擇文件或文件列表為空"); // 調試輸出
                        }
                    }}
                    className='image' />
            </div>
            <div>
                {previews.map((preview, index) => (
                    <img key={index} src={preview} alt={`預覽 ${index}`} className='previews' />
                ))}
            </div>
            <div className='add-input-3'>
                <h3>活動日期：</h3>
                <div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                    />
                </div>            </div>
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