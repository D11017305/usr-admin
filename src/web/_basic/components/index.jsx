import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import "../components/index.css";

export default function Index({ initialData = [], onEdit, onDelete, initialPage = 1, initialTotalPages = 1, onPageChange }) {
    const [data, setData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(initialTotalPages);

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
    }, []);

    const handleEdit = (id) => alert(`編輯項目: ${id}`);
    const handleDelete = (id) => alert(`刪除項目: ${id}`);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
        </>

        //     <div>

        //         <Button variant="contained" style={{ backgroundColor: '#94BD90' }}>+ 新增</Button>

        //         {/* <div className="pagination">
        //     <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>&laquo;&laquo;</button>
        //     <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
        //     {[...Array(totalPages)].map((_, index) => (
        //         <button
        //             key={index}
        //             onClick={() => handlePageChange(index + 1)}
        //             className={currentPage === index + 1 ? 'active' : ''}
        //         >
        //             {index + 1}
        //         </button>
        //     ))}
        //     <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
        //     <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>&raquo;&raquo;</button>
        // </div> */}
        //     </div>
    );
}
