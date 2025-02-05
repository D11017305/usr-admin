// TableComponent.js
import React, { useState } from 'react';
import "./TableComponent.css";


function TableComponent({ columns, data, onDelete, onEdit }) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    //前一頁
    function prePage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage-1)
        }
    }
    //頁數
    function changeCPage(id){
        setCurrentPage(id)
    }
    //下一頁
    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage +1)
        }
    }


    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            {Object.values(record).map((value, i) => (
                                <td key={i}>{value}</td>
                            ))}
                            <td>
                                <button className="btn btn-secondary" onClick={() => onEdit(record)}>修改</button>
                                <button className="btn btn-danger" onClick={() => onDelete(record)}>刪除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={() => prePage(currentPage - 1)} disabled={currentPage === 1}>
                            上一頁
                        </a>
                    </li>
                    {numbers.map((n, index) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={index}>
                            <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                                {n}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={() => nextPage(currentPage + 1)} disabled={currentPage === npage}>
                            下一頁
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default TableComponent;
