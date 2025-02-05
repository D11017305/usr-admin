import { Box, Button, Modal, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { ImportantLinkApi } from '../../../_basic/Protocol/ImportantLinkApi';
import TableComponent from '../../../_basic/components/TableComponent';
import LinkDelete from './LinkDelete';
import LinkForm from './LinkForm';

export default function ImportLink() {
    const [Data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [actionType,setActionType] = useState(null);
    const importLinkColumns = ['編號', '名稱', '連結', '功能'];

    useEffect(() => {
    const fetchData = async () => {
        try {
        const data = await ImportantLinkApi.getAllImportLink();
        if (Array.isArray(data)) {
            setData(data);
        } else {
            console.error("取得所有重要連結失敗");
        }
        } catch (error) {
        console.error("取得所有重要連結失敗", error);
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

    return (
        <>
            <div>
                <Button variant="contained" style={{ backgroundColor: '#94BD90', marginBottom: '30px' }} onClick={() => handleOpen(null, 'edit')}>+ 新增</Button>
                <TableComponent
                    columns={importLinkColumns}
                    data={Data}
                    onEdit={(record) => handleOpen(record, 'edit')}
                    onDelete={(record) => handleOpen(record, 'delete')}
                />
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography variant="h6" component="h5">
                        {actionType === 'edit' ? (currentRecord ? "修改重要連結" : "新增重要連結") : "刪除重要連結"}
                    </Typography>
                    {actionType == "edit" ? (
                        <LinkForm closeModal={handleClose} record={currentRecord} setData={setData} />
                    ) : (
                        <LinkDelete closeModal={handleClose} record={currentRecord} setData={setData} />
                    )}
                </Box>
            </Modal>
        </>
    )
};