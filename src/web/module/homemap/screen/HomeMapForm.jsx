import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { HomeMapApi } from '../../../_basic/Protocol/HomeMapApi';
import "../style/HomeMapAdd.css";

export default function HomeMapForm({ closeModal, record, setData }) {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [aname,setAname] = useState('');
    const [content_text,setContent_Text] = useState('');
    const [image, setImageName] = useState('');

    useEffect(() => {
        if (record) {
            console.log(record);
            // 編輯模式：預設載入記錄中的值
            setAname(record.aname || '');
            setContent_Text(record.content_text || '');
            setImageName(record.image || '');
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

        formData.append('aname', aname);
        formData.append('content_text', content_text);    

        if (files.length > 0) {
            formData.append('image', files[0]);
        }else if (image) {
            formData.append('image', image); // 保留現有圖片
        }

        if (!aname.trim() || !content_text.trim()) {
            alert("請完整填寫所有必要資訊！");
            return;
        }
        
        if (!record && files.length === 0) {
            alert("新增時必須上傳圖片！");
            return;
        }
        
    
        // console.log("formData",formData);
        try {
            if (record) {
                // 編輯模式
                await HomeMapApi.putHomeMap(record.id, formData);
                setData(prevData =>
                    prevData.map(item =>
                        item.id === record.id
                        ? {
                            ...item,
                            aname:aname,
                            image: files.length > 0 ? files[0].name : image,
                            content_text:content_text,
                        }
                        : item
                    )
                );
            } else {
                // 新增模式
                const newRecord = await HomeMapApi.postNewHomeMap(formData);
                setData(prevData => [...prevData, newRecord]); // 更新數據狀態
                console.log(newRecord);
            }
            
            closeModal();
            // 重置狀態
            setAname('');
            setContent_Text('');
            setFiles([]);
            setPreviews([]);
            setImageName('');
        } catch (error) {
            console.error("操作失敗", error.response?.data || error);
            alert("操作失敗，請稍後再試！");
        }
    };
    

    return (
        <div className='carousel'>
            <div className='add-input'>
                <h6>地區：</h6>
                <input
                    type="text"
                    placeholder="請輸入地區"
                    value={aname} // 確保 value 總是有值
                    onChange={(e) => setAname(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
            </div>
            <div className='add-input'>
                <h6>內容：</h6>
                <input
                    type="text"
                    placeholder="請輸入內容"
                    value={content_text} // 確保 value 總是有值
                    onChange={(e) => setContent_Text(e.target.value)}
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
