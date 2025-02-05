import { Box, Button, Modal, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { ReportApi } from '../../../_basic/Protocol/ReportApi';
import TableComponent from '../../../_basic/components/TableComponent';
import ReportDelete from './ReportDelete';
import ReportForm from './ReportForm';

export default function Report() {
    const [Data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [actionType,setActionType] = useState(null);
    const importLinkColumns = ['編號', '名稱', '檔案', '年度', '功能'];

    useEffect(() => {
    const fetchData = async () => {
        try {
        const data = await ReportApi.getAllReport();
        if (Array.isArray(data)) {
            setData(data);
        } else {
            console.error("取得所有年度報告失敗");
        }
        } catch (error) {
        console.error("取得所有年度報告失敗", error);
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
                <div style={{color:"red"}}>請上傳副檔名為pdf、doc、docx</div>
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
                        {actionType === 'edit' ? (currentRecord ? "修改年度報告" : "新增年度報告") : "刪除年度報告"}
                    </Typography>
                    {actionType == "edit" ? (
                        <ReportForm closeModal={handleClose} record={currentRecord} setData={setData} />
                    ) : (
                        <ReportDelete closeModal={handleClose} record={currentRecord} setData={setData} />
                    )}
                </Box>
            </Modal>
        </>
    )
};