import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NewsApi } from '../../../_basic/Protocol/NewsApi';
import "../style/NewsAdd.css";

export default function NewsForm({ closeModal, record, setData }) {
    const [nname, setNname] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (record) {
            // 編輯模式：預設載入記錄中的值
            setNname(record.name || '');
            setLink(record.link || '');
        }
    }, [record]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', nname);
        formData.append('link', link);
    
        if (!record && (!nname || !link)) {
            alert("請填寫所有必填資訊！");
            return;
        }
    
        try {
            if (record) {
                // 編輯模式
                const updatedRecord = await NewsApi.putNews(record.id, formData);
                setData(prevData =>
                    prevData.map(item => item.id === record.id ? { ...item, name: nname, link } : item)
                );
            } else {
                // 新增模式
                const newRecord = await NewsApi.postNewNews(formData);
                setData(prevData => [...prevData, newRecord]);
            }
            
            // 重置狀態
            closeModal();
            setNname('');
            setLink('');
        } catch (error) {
            console.error("操作失敗", error.response?.data || error);
            alert("操作失敗，請稍後再試！");
        }
    };

    useEffect(() => {
        console.log("Data updated:", record);
    }, [record]);
    

    return (
        <div className='carousel'>
            <div className='add-input'>
                <h6>標題：</h6>
                <input
                    type="text"
                    placeholder="請輸入標題"
                    value={nname}
                    onChange={(e) => setNname(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
            </div>
            <div className='add-input'>
                <h6>連結：</h6>
                <input
                    type="text"
                    placeholder="請輸入連結"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
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
