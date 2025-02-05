import { Box, Button, Modal, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { CarouselApi } from '../../../_basic/Protocol/CarouselApi';
import TableComponent from '../../../_basic/components/TableComponent';
import "../style/Carousel.css";
import CarouselDelete from './CarouselDelete';
import CarouselForm from './CarouselForm';

export default function Carousel() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [actionType,setActionType] = useState(null);
    const carouselColumns = ['編號', '活動名稱', '圖片', '導入日期', '功能'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await CarouselApi.getAllCarousel();
                if (Array.isArray(response)) {
                    setData(response);
                } else {
                    console.error("取得所有輪播圖失敗");
                }
            } catch (error) {
                console.error("取得所有輪播圖失敗", error);
            }
        };
        fetchData();
    }, []);

    const handleOpen = (record, type) => {
        setCurrentRecord(record);
        setActionType(type); // 設置操作類型
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentRecord(null);
        setActionType(null);
    };

    return (
        <>
            <div>
            <h1 style={{ marginTop: '-10px', marginLeft: '45%' }}>輪播圖</h1>
                <Button variant="contained" style={{ backgroundColor: '#94BD90', marginBottom: '30px' }} onClick={() => handleOpen(null, 'edit')}> + 新增 </Button>
                <TableComponent
                    columns={carouselColumns}
                    data={data}
                    onEdit={(record) => handleOpen(record, 'edit')} // 點擊編輯時開啟編輯模式
                    onDelete={(record) => handleOpen(record, 'delete')} // 點擊刪除時開啟刪除模式
                />
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography variant="h6" component="h5">
                        {actionType === 'edit' ? (currentRecord ? "修改輪播圖" : "新增輪播圖") : "刪除輪播圖"}
                    </Typography>
                    {actionType === 'edit' ? (
                        <CarouselForm closeModal={handleClose} record={currentRecord} setData={setData} />
                    ) : (
                        <CarouselDelete closeModal={handleClose} record={currentRecord} setData={setData} />
                    )}
                </Box>
            </Modal>
            
        </>
    );
}
