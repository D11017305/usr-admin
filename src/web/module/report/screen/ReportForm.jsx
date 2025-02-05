import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ReportApi } from '../../../_basic/Protocol/ReportApi';
import "../style/ReportAdd.css";

export default function ReportForm({ closeModal, record, setData }) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (record) {
            // 編輯模式：預設載入記錄中的值
            setTitle(record.name || '');
            setYear(record.year || '');
            // 如果存在檔案名稱，則不強制要求重新上傳檔案
            setFile(record.file || null);
        }
    }, [record]);

    const handleSubmit = async () => {
        // 如果是新增模式，檢查必填欄位
        if (!record && (!title || !year || !file)) {
            alert("請填寫所有必填資訊並上傳檔案！");
            return;
        }

        const formData = new FormData();
        formData.append('name', title);
        formData.append('year', year);
        if (file) formData.append('file', file); // 僅在選擇檔案時才加入檔案

        try {
            if (record) {
                // 編輯模式
                const updatedRecord = await ReportApi.putReport(record.id, formData);
                setData(prevData =>
                    prevData.map(item => item.id === record.id 
                        ? { ...item, name: title, year, filePath: updatedRecord.filePath || item.filePath } : item)
                );
            } else {
                // 新增模式
                const newRecord = await ReportApi.postNewReport(formData);
                setData(prevData => [...prevData, newRecord]);
            }

            // 重置狀態
            closeModal();
            setTitle('');
            setYear('');
            setFile(null); // 重置檔案
        } catch (error) {
            console.error("操作失敗", error.response?.data || error);
            alert("操作失敗，請稍後再試！");
        }
    };

    return (
        <div className='carousel'>
            <div className='add-input'>
                <h6>名稱：</h6>
                <input
                    type="text"
                    placeholder="與檔名相同"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='add-input-text'
                    disabled
                />
            </div>

            <div className='add-input'>
                <h6>年度：</h6>
                <input
                    type="text"
                    placeholder="請輸入年度"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className='add-input-text'
                    maxLength={4}
                />
            </div>

            <div className='add-input'>
                <h6>上傳檔案：</h6>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className='add-input-text'
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
