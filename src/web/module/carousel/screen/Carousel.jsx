import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Button } from '@mui/material';
import "../style/Carousel.css";
import CarouselAdd from "../../carousel/screen/CarouselAdd";
import CarouselEdit from "../screen/CarouselEdit";

export default function Carousel() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/data');
                const result = await response.json();
                setData(result);
                setTotalPages(Math.ceil(result.length / itemsPerPage));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [itemsPerPage]);

    const handleEdit = (id) => {
        navigate('edit');
        alert(`編輯項目: ${id}`);
    };

    const handleDelete = (id) => {
        navigate('delete');
        alert(`刪除項目: ${id}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAdd = () => {
        navigate('add');
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <>
            <div>
                <h1 style={{ marginTop: '-10px', marginLeft: '45%' }}>輪播圖</h1>

                <div>
                    <Button variant="contained"
                        style={{ backgroundColor: '#94BD90', marginBottom: '30px' }}
                        onClick={handleAdd}>+ 新增</Button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>編號</th>
                            <th>圖片</th>
                            <th>活動日期</th>
                            <th>導入日期</th>
                            <th>功能</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <img src={item.image} alt={`${item.name}`} width="50" />
                                </td>
                                <td>{item.eventDate}</td>
                                <td>{item.importDate}</td>
                                <td>
                                    <button className="button edit" onClick={() => handleEdit(item.id)}>編輯</button>
                                    <button className="button delete" onClick={() => handleDelete(item.id)}>刪除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index}
                            variant="text"
                            onClick={() => handlePageChange(index + 1)}
                            style={{ margin: '0 5px', color: currentPage === index + 1 ? 'blue' : 'black' }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </div>
            <Routes>
                <Route path="add" element={<CarouselAdd />} />
            </Routes>
        </>
    );
}