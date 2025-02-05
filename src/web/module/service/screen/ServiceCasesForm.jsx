import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CasesApi } from '../../../_basic/Protocol/Service/CasesApi';
import { RegionApi } from '../../../_basic/Protocol/Service/RegionApi';
import "../style/serviceAdd.css";

export default function ServiceCasesForm({ closeModal, record, setCasesData }) {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [title, setTitle] = useState('');
    const [pdfLink, setPDFLink] = useState('');
    const [contentDate, setContentDate] = useState('');
    const [region, setRegion] = useState('');
    const [selectRegion, setSelectRegion] = useState([]);
    
    useEffect(() => {
        if (record) {
            // 編輯模式：預設載入記錄中的值

            setTitle(record.title || '');
            setPDFLink(record.pdfLink || '');
            setContentDate(record.contentDate || '');
            setRegion(record.regionId || '');
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
        formData.append('title', title);
        formData.append('pdfLink', pdfLink);
        formData.append('content_date', contentDate);
        formData.append('regionId', region);
        files.forEach(file => {
            formData.append('image', file);
        });

        if (!region) {
            alert("請選擇地區");
            return;
        }
    
        try {
            if (record) {
                // 編輯模式
                const updatedRecord = await CasesApi.putCases(record.id, formData);
                setCasesData(prevData =>
                    prevData.map(item => item.id === record.id ? { ...item, title:title,pdfLink:pdfLink,contentDate:contentDate,image: files.map(file => file.name)} : item)
                );
            } else {
                // 新增模式
                const newRecord = await CasesApi.postNewCases(formData);
                setCasesData(prevData => [...prevData, newRecord]);
            }
            
            // 重置狀態
            closeModal();
            setTitle('');
            setPDFLink('');
            setContentDate('');
            setRegion('');
            setFiles([]);
            setPreviews([]);
            setSelectRegion([]);
        } catch (error) {
            console.error("操作失敗", error.response?.data || error);
            alert("操作失敗，請稍後再試！");
        }
    };
    
    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const data = await RegionApi.getAllRegion();
                setSelectRegion(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("取得所有地區失敗", error);
                setSelectRegion([]);
            };
        }
        fetchCountryData();
    },[])

    return (
        <div className='carousel'>
            <div className='add-input'>
                <h6>標題：</h6>
                <input
                    type="text"
                    placeholder="請輸入標題"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='add-input-text'
                    maxLength={300}
                />
            </div>

            <div className='add-input'>
                <h6>連結：</h6>
                <input
                    type="text"
                    placeholder="請輸入PDF連結"
                    value={pdfLink}
                    onChange={(e) => setPDFLink(e.target.value)}
                    className='add-input-text'
                    maxLength={300}
                />
            </div>

            <div className='add-input'>
                <h6>日期：</h6>
                <input
                    type="text"
                    placeholder="請輸入足跡日期'格式注意'"
                    value={contentDate}
                    onChange={(e) => setContentDate(e.target.value)}
                    className='add-input-text'
                    maxLength={30}
                />
            </div>

            <div className='add-input'>
                <h6>地區：</h6>
                <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className='add-input-text'
                >
                    <option value="">請選擇地區</option>
                    {Array.isArray(selectRegion) && selectRegion.map((region, index) => (
                        <option key={index} value={region.id}>{region.name}</option>
                    ))}
                </select>
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
