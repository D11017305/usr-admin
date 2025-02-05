import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CarouselApi } from '../../../_basic/Protocol/CarouselApi';
import "../style/CarouselAdd.css";

export default function CarouselForm({ closeModal, record, setData }) {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [imageName, setImageName] = useState(''); // 默認值設為空字串

    useEffect(() => {
        if (record) {
            // 編輯模式：預設載入記錄中的值
            setImageName(record.imageName || '');
        }
    }, [record]);

    useEffect(() => {
        if (files.length > 0) {
            const previewUrls = files.map(file => URL.createObjectURL(file));
            setPreviews(previewUrls);
            return () => previewUrls.forEach(url => URL.revokeObjectURL(url));
        } else {
            setPreviews([]);
        }
    }, [files]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('imageName', imageName);
        files.forEach(file => {
            formData.append('image', file);
        });
    
        if (!imageName || (files.length === 0 && !record?.image)) {
            alert("請填寫標題並上傳圖片！");
            return;
        }
    
        try {
            if (record) {
                // 編輯模式
                await CarouselApi.putCarousel(record.id, formData); // 傳遞 ID
                setData(prevData => prevData.map(item => item.id === record.id ? { ...item, imageName } : item));
            } else {
                // 新增模式
                const newRecord = await CarouselApi.postNewCarousel(formData);
                setData(prevData => [...prevData, newRecord]); // 更新數據狀態
            }
            closeModal();
            // 重置狀態
            setImageName('');
            setFiles([]);
            setPreviews([]);
        } catch (error) {
            console.error("操作失敗", error.response?.data || error);
            alert("操作失敗，請稍後再試！");
        }
    };
    

    return (
        <div className='carousel'>
            <div className='add-input'>
                <h6>標題：</h6>
                <input
                    type="text"
                    placeholder="請輸入標題"
                    value={imageName} // 確保 value 總是有值
                    onChange={(e) => setImageName(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
            </div>
            <div className='add-input-2'>
                <h6>圖片：</h6>
                <input
                    type='file'
                    accept='image/jpg,image/jpeg,image/png'
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setFiles(Array.from(e.target.files));
                        }
                    }}
                    className='image'
                />
            </div>
            <div>
                {previews.map((preview, index) => (
                    <img key={index} src={preview} alt={`預覽 ${index}`} className='previews' />
                ))}
            </div>

            <div className='add-btn'>
                <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#ECE6F0', color: 'black', marginRight: '30px' }}
                    onClick={handleSubmit}
                >
                    {record ? "確定修改" : "確定新增"}
                </Button>
                <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#ECE6F0', color: 'black' }}
                    onClick={closeModal}
                >
                    取消
                </Button>
            </div>
        </div>
    );
}
