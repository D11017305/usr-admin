import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CountryApi } from '../../../_basic/Protocol/Service/CountryApi';
import "../style/serviceAdd.css";

export default function ServiceCountryForm({ closeModal, record, setCData }) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (record) {
            // 編輯模式：預設載入記錄中的值
            setTitle(record.name || '');
        }
    }, [record]);

    const handleSubmit = async () => {
        if (!title) {
            alert("請填寫所有必填資訊！");
            return;
        }
    
        const formData = new FormData();
        formData.append('name', title);
    
        try {
            if (record) {
                // 編輯模式
                const updatedRecord = await CountryApi.putCountry(record.id, formData);
                console.log('Updated Data:', updatedRecord);
    
                // 更新資料
                setCData(prevData => 
                    prevData.map(item => item.id === record.id ? { ...item, name: title } : item)
                );
            } else {
                // 新增模式
                const newRecord = await CountryApi.postNewCountry(formData);
                console.log('New Record:', newRecord);
    
                // 添加新記錄
                setCData(prevData => [...prevData, newRecord]);
            }
    
            // 成功後關閉 Modal 並重置狀態
            closeModal();
            setTitle('');
        } catch (error) {
            console.error("操作失敗", error.response?.data || error);
            alert("操作失敗，請稍後再試！");
    
            if (error.response && error.response.data) {
                console.log('API錯誤回應:', error.response.data);
                alert(`API錯誤：${error.response.data.message || '未知錯誤'}`);
            } else {
                console.log('錯誤:', error.message);
                alert(`錯誤：${error.message}`);
            }
        }
    };
    

    return (
        <div className='carousel'>
            <div className='add-input'>
                <h6>國家：</h6>
                <input
                    type="text"
                    placeholder="請輸入國家名稱"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='add-input-text'
                    maxLength={30}
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
