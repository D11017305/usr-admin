import { Box, Button, Modal, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { NewsApi } from '../../../_basic/Protocol/NewsApi';
import TableComponent from '../../../_basic/components/TableComponent';
import NewsDelete from './NewsDelete';
import NewsForm from './NewsForm';


export default function News(){
    const [Data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [actionType,setActionType] = useState(null);
    const activityColumns = ['編號', '連結', '名稱', '功能'];

    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await NewsApi.getAllNews();
            if (Array.isArray(data)) {
                setData(data);
            } else {
                console.error("取得所有亮點報導失敗");
            }
            } catch (error) {
            console.error("取得所有亮點報導失敗", error);
            }
        };
        fetchData();
    }, []);

    const handleOpen = (record, type) => {
        // console.log(open , currentRecord);
        setCurrentRecord(record);
        setActionType(type);
        setOpen(true);
    };

    const handleClose = () => {
        // console.log(open , currentRecord);
        setOpen(false);
        setCurrentRecord(null);
        setActionType(null);
    };

    return(
        <>
        <h1 style={{ marginTop: '-10px', marginLeft: '45%' }}>亮點報導</h1>
            <div>
                <Button variant="contained" style={{ backgroundColor: '#94BD90', marginBottom: '30px' }} onClick={() => handleOpen(null, 'edit')}>+ 新增</Button>
                <TableComponent
                    columns={activityColumns}
                    data={Data}
                    onEdit={(record) => handleOpen(record, 'edit')}
                    onDelete={(record) => handleOpen(record, 'delete')}
                />
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography variant="h6" component="h5">
                        {actionType === 'edit' ? (currentRecord ? "修改亮點報導" : "新增亮點報導") : "刪除亮點報導"}
                    </Typography>
                    {actionType == "edit" ? (
                        <NewsForm closeModal={handleClose} record={currentRecord} setData={setData} />
                    ) : (
                        <NewsDelete closeModal={handleClose} record={currentRecord} setData={setData} />
                    )}
                </Box>
            </Modal>
        </>
    );
};