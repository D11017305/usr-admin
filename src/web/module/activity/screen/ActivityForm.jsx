import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AchievementsApi } from '../../../_basic/Protocol/AchievementsApi';
import "../style/ActivityAdd.css";

export default function ActivityForm({ closeModal, record, setData }) {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [aName, setAName] = useState('');
    const [activityDate, setActivityDate] = useState('');
    const [link, setLink] = useState('');
    const [imageName, setImageName] = useState(''); // 默認值設為空字串

    useEffect(() => {
        if (record) {
            // 編輯模式：預設載入記錄中的值
            setAName(record.name || '');
            setLink(record.iink || '');
            setActivityDate(record.activity || '');
            setImageName(record.image || ''); // 使用與第一段一致的初始化方式
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
        formData.append('aname', aName);
        formData.append('activity', activityDate);
        formData.append('link', link);
    
        if (files.length > 0) {
            // 新圖片上傳
            files.forEach(file => {
                formData.append('image', file);
            });
        } else {
            // 保留舊圖片名稱
            formData.append('imageName', imageName);
        }
    
        // 表單驗證
        if ((!record && (!aName || !activityDate || !link || files.length === 0))) {
            alert("請填寫活動名稱、日期、連結並上傳圖片！");
            return;
        }
    
        try {
            if (record) {
                // 編輯模式
                await AchievementsApi.putAchievements(record.id, formData);
                setData(prevData => prevData.map(item => 
                    item.id === record.id 
                        ? { ...item, name: aName, activity: activityDate, iink: link, image: files.length > 0 ? files.map(file => file.name) : imageName } 
                        : item
                ));
            } else {
                // 新增模式
                const newRecord = await AchievementsApi.postNewAchievements(formData);
                setData(prevData => [...prevData, newRecord]);
            }
    
            closeModal();
    
            // 重置狀態
            setAName('');
            setActivityDate('');
            setLink('');
            setFiles([]);
            setPreviews([]);
            setImageName(''); // 重置 imageName
        } catch (error) {
            console.error("操作失敗", error.response?.data || error);
            alert("操作失敗，請稍後再試！");
        }
    };
  
    return (
        <div className='carousel'>
            <div className='add-input'>
                <h6>活動名稱：</h6>
                <input
                    type="text"
                    placeholder="請輸入活動名稱"
                    value={aName}
                    onChange={(e) => setAName(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
            </div>
            <div className='add-input2'>
                <h6>活動日期：</h6>
                <input
                    type="text"
                    placeholder="請輸入活動日期"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    className='add-input-text'
                    maxLength={50}
                />
                <span className='text-color'>格式注意</span>
            </div>

            <div className='add-input2'>
                <h6>活動連結：</h6>
                <input
                    type="text"
                    placeholder="請輸入活動報導連結"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className='add-input-text'
                    maxLength={300}
                />
            </div>

            <div className='add-input-2'>
                <h6>圖片：</h6>
                <input
                    type='file'
                    accept='image/jpg,image/jpeg,image/png'
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setFiles(Array.from(e.target.files));  // Convert FileList to array
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
                    {record ? "取消修改" : "取消新增"}
                </Button>
            </div>

        </div>
    );
}
