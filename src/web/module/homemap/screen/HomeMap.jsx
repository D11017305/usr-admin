import { Box, Button, Modal, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { HomeMapApi } from '../../../_basic/Protocol/HomeMapApi';
import TableComponent from '../../../_basic/components/TableComponent';
import "../style/HomeMapAdd.css";
import ActivityDelete from './HomeMapDelete';
import ActivityForm from './HomeMapForm';


export default function HomeMap() {
    // const navigate = useNavigate();
    const [Data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [actionType, setActionType] = useState(null);
    const activityColumns = ['編號', '地區', '內容', '圖片','功能'];

    useEffect(() => {
        // 從 API 取得資料
        const fetchData = async () => {
            try {
                const data = await HomeMapApi.getAllHomeMap();
                if (Array.isArray(data)) {
                    setData(data);
                    // console.log(data);
                } else {
                    console.error("取得所有首頁地圖失敗");
                }
            } catch (error) {
                console.error("取得所有首頁地圖失敗", error);
            }
        };
        fetchData();
    }, []);


    const handleOpen = (record, type) => {
        console.log(open , currentRecord, actionType);
        setCurrentRecord(record);
        setActionType(type); // 設置操作類型
        setOpen(true);
    };

    const handleClose = () => {
        // console.log(open, currentRecord,actionType);
        setOpen(false);
        setCurrentRecord(null);
        setActionType(null);
    };




    return (
        <>
            <div>
                <Button variant="contained" style={{ backgroundColor: '#94BD90', marginBottom: '30px' }} onClick={() => handleOpen(null, 'edit')}>+ 新增</Button>
                <TableComponent
                    columns={activityColumns}
                    data={Data}
                    onDelete={(record) => handleOpen(record, 'delete')} // 點擊刪除時開啟刪除模式
                    onEdit={(record) => handleOpen(record, 'edit')} // 點擊編輯時開啟編輯模式
                />
            </div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography variant="h6" component="h5">
                        {actionType === 'edit' ?
                            (currentRecord ? "修改首頁地圖" : "新增首頁地圖")
                            : "刪除首頁地圖"}
                    </Typography>

                    {actionType === 'edit' ? (
                        // 編輯或新增表單
                        <ActivityForm
                            closeModal={handleClose}
                            record={currentRecord}
                            setData={setData}
                        />
                    ) : actionType === 'delete' ? (
                        // 刪除確認組件
                        <ActivityDelete
                            closeModal={handleClose}
                            record={currentRecord}
                            setData={setData}
                        />
                    ) : null}
                </Box>
            </Modal>

        </>
    );



}