import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CountryApi } from '../../../_basic/Protocol/Service/CountryApi';
import { RegionApi } from '../../../_basic/Protocol/Service/RegionApi';
import "../style/serviceAdd.css";

export default function ServiceRegionForm({ closeModal, record, setRData }) {

    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('');
    const [selectCountry, setSelectCountry] = useState([]);
    

    useEffect(() => {
        if (record) {
            // 編輯模式：預設載入記錄中的值
            setTitle(record.name || '');
        }
    }, [record]);

    const handleSubmit = async () => {
        // 檢查是否填寫所有必要的資訊
        if (!title || !country) {
            alert("請填寫所有資訊！");
            return;
        }
    
        const formData = new FormData();
        formData.append('name', title);
        formData.append('countryId', country);
    
        try {
            if (record) {
                // 編輯模式
                const updatedRecord = await RegionApi.putRegion(record.id, formData);
                setRData(prevData =>
                    prevData.map(item => item.id === record.id ? { ...item, name: title} : item)
                );
            } else {
                // 新增模式
                const newRecord = await RegionApi.postNewRegion(formData);
                setRData(prevData => [...prevData, newRecord]);
            }
            
            // 重置狀態
            closeModal();
            setTitle('');
            setCountry('');
        } catch (error) {
            console.error("操作失敗", error.response?.data || error);
            alert("操作失敗，請稍後再試！");
        }
    };
    
    
    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const data = await CountryApi.getAll();
                setSelectCountry(data);
                console.log(data)
            } catch (error) {
                console.error("取得所有國家失敗", error);
            };
        }
        fetchCountryData();
    },[])

    return (
        <div className='carousel'>
            <div className='add-input'>
                <h6>地區：</h6>
                <input
                    type="text"
                    placeholder="請輸入地區名稱"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
            </div>

            <div className='add-input'>
                <h6>國家：</h6>
                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className='add-input-text'
                >
                    <option value="">請選擇國家</option>
                    {selectCountry.map((country, index) => (
                        <option key={index} value={country.id}>{country.name}</option>
                    ))}
                </select>
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
