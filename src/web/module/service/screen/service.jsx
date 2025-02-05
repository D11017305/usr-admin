import { Box, Button, Modal, Typography } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { CasesApi } from '../../../_basic/Protocol/Service/CasesApi';
import { CountryApi } from '../../../_basic/Protocol/Service/CountryApi';
import { RegionApi } from '../../../_basic/Protocol/Service/RegionApi';
import TableComponent from '../../../_basic/components/TableComponent';
import "../style/serviceAdd.css";
import ServiceCasesDelete from './ServiceCasesDelete';
import ServiceCasesForm from './ServiceCasesForm';
import ServiceCountryDelete from './ServiceCountryDelete';
import ServiceCountryForm from './ServiceCountryForm';
import ServiceRegionDelete from './ServiceRegionDelete';
import ServiceRegionForm from './ServiceRegionForm';


export default function Service() {
    const [cData, setCData] = useState([]);
    const [rData, setRData] = useState([]);
    const [casesData, setCasesData] = useState([]);
    const [openCountryModal, setOpenCountryModal] = useState(false);
    const [openRegionModal, setOpenRegionModal] = useState(false);
    const [openCasesModal, setOpenCasesModal] = useState(false);
    // const [editingRecord, setEditingRecord] = useState(null);// 用來存放編輯或新增的資料
    // const [editingType, setEditingType] = useState('');// 'add' or 'edit'
    const [actionType,setActionType] = useState(null);
    const [currentRecord, setCurrentRecord] = useState(null);
    const countryColumns = ['編號', '名稱', '  ','功能'];
    const regionColumns = ['編號', '名稱', '  ', '功能'];
    const casesColumns = ['編號', '活動名稱', '圖片', '活動連結(.pdf)', '匯入時間', '活動日期', '功能'];

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const data = await CountryApi.getAll();
                if (Array.isArray(data)) setCData(data);
            } catch (error) {
                console.error("取得所有國家失敗", error);
            }
        };
        fetchCountryData();

        const fetchRegionData = async () => {
            try {
                const data = await RegionApi.getAllRegion();
                if (Array.isArray(data)) setRData(data);
            } catch (error) {
                console.error("取得所有地區失敗", error);
            }
        };
        fetchRegionData();

        const fetchCasesData = async () => {
            try {
                const data = await CasesApi.getAllCases();
                if (Array.isArray(data)) setCasesData(data);
            } catch (error) {
                console.error("取得所有案例失敗", error);
            }
        };
        fetchCasesData();
    }, []);

    // const handleDelete = async (record, type) => {
    //     const confirmDelete = window.confirm("確定要刪除這項資料嗎？");
    //     if (!confirmDelete) return;

    //     try {
    //         if (type === 'country') {
    //             await CountryApi.deleteCountry(record.id);
    //             setCData(cData.filter(item => item.id !== record.id));
    //         } else if (type === 'region') {
    //             await RegionApi.deleteRegion(record.id);
    //             setRData(rData.filter(item => item.id !== record.id));
    //         } else if (type === 'case') {
    //             await CasesApi.deleteCase(record.id);
    //             setCasesData(casesData.filter(item => item.id !== record.id));
    //         }
    //         // console.log(`${type} 刪除成功`);
    //     } catch (error) {
    //         // console.error(`${type} 刪除失敗`, error);
    //         alert(`${type} 刪除失敗，請稍後再試。`);
    //     }
    // };

    const handleOpen = (type, action, record = null) => {
        console.log(record);
        setCurrentRecord(record);
        setActionType(action);
        if (type === 'country') {
            setOpenCountryModal(true);
        } else if (type === 'region') {
            setOpenRegionModal(true);
        }else if (type === 'cases') {
            setOpenCasesModal(true);
        }
    };

    const handleClose = () => {
        setOpenCountryModal(false);
        setOpenRegionModal(false);
        setOpenCasesModal(false);
        setActionType(null);
        setCurrentRecord(null);
    };

    // const handleEdit = (record, type) => {
    //     console.log("record",record);
    //     setEditingType('edit');
    //     setEditingRecord(record);
    //     if (type === 'country') setOpenCountryModal(true);
    //     else if (type === 'region') setOpenRegionModal(true);
    //     else if (type === 'case') setOpenCasesModal(true);
    // };

    // const handleAdd = (type) => {
    //     setEditingType('add');
    //     setEditingRecord(null); // 新增時清空編輯記錄
    //     if (type === 'country') setOpenCountryModal(true);
    //     else if (type === 'region') setOpenRegionModal(true);
    //     else if (type === 'case') setOpenCasesModal(true);
    // };

    return (
        <>
            {/* ====國家==== */}
        <div>
            <h4>國家</h4>
            <Button variant="contained" style={{ backgroundColor: '#94BD90', marginBottom: '30px' }} onClick={() => handleOpen('country', 'add')}>+ 新增</Button>
            <TableComponent
                columns={countryColumns}
                data={cData}
                onEdit={(record) => handleOpen('country', 'edit', record)}
                onDelete={(record) => handleOpen('country', 'delete', record)}
            />
        </div>

        <Modal open={openCountryModal} onClose={handleClose}>
            <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: 2 }}>
                <Typography variant="h6" component="h5">
                    {actionType === 'edit' ? "修改國家" : actionType === 'delete' ? "刪除國家" : "新增國家"}
                </Typography>
                {actionType === 'edit' || actionType === 'add' ? (
                    <ServiceCountryForm closeModal={handleClose} record={currentRecord} setCData={setCData} />
                ) : (
                    <ServiceCountryDelete closeModal={handleClose} record={currentRecord} setCData={setCData} />
                )}
            </Box>
        </Modal>

            {/* ====地區============================================== */}
            <div>
                <h4>地區</h4>
                <Button variant="contained" style={{ backgroundColor: '#94BD90', marginBottom: '30px' }} onClick={() => handleOpen('region', 'add')} >+ 新增</Button>
                <TableComponent
                    columns={regionColumns}
                    data={rData}
                    onEdit={(record) => handleOpen('region', 'edit', record)}
                    onDelete={(record) => handleOpen('region', 'delete', record)}
                />
            </div>

            <Modal open={openRegionModal} onClose={handleClose}>
                <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography>
                        {actionType === 'edit' ? "修改地區" : actionType === 'delete' ? "刪除地區" : "新增地區"}
                    </Typography>
                    {actionType === 'edit' || actionType === 'add' ? (
                        <ServiceRegionForm closeModal={handleClose} record={currentRecord} setRData={setRData} />
                    ) : (
                        <ServiceRegionDelete closeModal={handleClose} record={currentRecord} setRData={setRData} />
                    )}
                </Box>
            </Modal>


            {/* ====足跡============================================== */}
            <div>
                <h4>足跡</h4>
                <Button variant="contained" style={{ backgroundColor: '#94BD90', marginBottom: '30px' }} onClick={() => handleOpen('cases', 'add')} >+ 新增</Button>
                <TableComponent
                    columns={casesColumns}
                    data={casesData}
                    onEdit={(record) => handleOpen('cases', 'edit', record)}
                    onDelete={(record) => handleOpen('cases', 'delete', record)}
                />
            </div>

            <Modal open={openCasesModal} onClose={handleClose}>
                <Box sx={{ width: 400, padding: 4, margin: '100px auto', backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography>
                        {actionType === 'edit' ? "修改足跡" : actionType === 'delete' ? "刪除足跡" : "新增足跡"}
                    </Typography>
                    {actionType === 'edit' || actionType === 'add' ? (
                        <ServiceCasesForm closeModal={handleClose} record={currentRecord} setCasesData={setCasesData} />
                    ) : (
                        <ServiceCasesDelete closeModal={handleClose} record={currentRecord} setCasesData={setCasesData} />
                    )}
                </Box>
            </Modal>

        </>
    );
}
