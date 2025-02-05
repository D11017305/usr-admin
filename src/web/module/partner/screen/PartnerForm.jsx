import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PartnerApi } from '../../../_basic/Protocol/PartnerApi';
import "../style/PartnerAdd.css";

export default function PartnerForm({ closeModal, record, setData }) {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [organizeName, setOrganizeName] = useState('');
    const [positionName, setPositionName] = useState('');
    const [partnerName, setPartnerName] = useState('');
    const [image, setImageName] = useState('');

    useEffect(() => {
        if (record) {
            // 編輯模式：預設載入記錄中的值
            setOrganizeName(record.organizeName || '');
            setPositionName(record.positionName || '');
            setPartnerName(record.partnerName || '');
            setImageName(record.partnerImage || '');
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
        formData.append('organizeName', organizeName);
        if (files.length > 0) {
            formData.append('partnerImage', files[0]);
        }else if (image) {
            formData.append('partnerImage', image); // 保留現有圖片
        }
        formData.append('partnerName', partnerName);
        formData.append('positionName', positionName);
    
        if (!organizeName.trim() || !positionName.trim() || !partnerName.trim()) {
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
                await PartnerApi.putPartner(record.id, formData);
                setData(prevData =>
                    prevData.map(item =>
                        item.id === record.id
                        ? {
                            ...item,
                            organizeName,
                            partnerImage: files.length > 0 ? files[0].name : image,
                            partnerName,
                            positionName,
                        }
                        : item
                    )
                );
            } else {
                // 新增模式
                const newRecord = await PartnerApi.postNewPartner(formData);
                setData(prevData => [...prevData, newRecord]); // 更新數據狀態
            }
            
            closeModal();
            // 重置狀態
            setOrganizeName('');
            setPositionName('');
            setPartnerName('');
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
                <h6>組織：</h6>
                <input
                    type="text"
                    placeholder="請輸入組織"
                    value={organizeName} // 確保 value 總是有值
                    onChange={(e) => setOrganizeName(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
            </div>
            <div className='add-input'>
                <h6>職位：</h6>
                <input
                    type="text"
                    placeholder="請輸入職位"
                    value={positionName} // 確保 value 總是有值
                    onChange={(e) => setPositionName(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
            </div>
            <div className='add-input'>
                <h6>名稱：</h6>
                <input
                    type="text"
                    placeholder="請輸入名稱"
                    value={partnerName} // 確保 value 總是有值
                    onChange={(e) => setPartnerName(e.target.value)}
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
