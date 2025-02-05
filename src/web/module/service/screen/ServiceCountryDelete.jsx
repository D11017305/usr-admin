import { Button } from '@mui/material';
import { CountryApi } from '../../../_basic/Protocol/Service/CountryApi';
import "../style/serviceAdd.css";


export default function SCountryDelete({ closeModal, record, setCData }) {

    const handleDelete = async () => {
        try {
            await CountryApi.deleteCountry(record.id);
            console.log("刪除成功");
            closeModal(); 
            setCData(prevData => prevData.filter(item => item.id !== record.id));
        } catch (error) {
            console.error("刪除失敗", error);
    
            // 檢查 error.response 和 error.response.data 是否存在
            if (error.response && error.response.data) {
                console.error("API錯誤回應:", error.response.data);
                alert(`刪除失敗：${error.response.data.message || '未知錯誤'}`);
            } else {
                console.error("未知錯誤:", error.message);
                alert(`刪除失敗：${error.message || '請稍後再試。'}`);
            }
        }
    };

    return (
        <div className='carousel'>
            <div className='add-btn'>
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#ECE6F0', color: 'black', marginRight: '30px' }}
                        onClick={handleDelete}
                    >
                        確定刪除
                    </Button>
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#ECE6F0', color: 'black' }}
                        onClick={closeModal}  // Close modal without submitting
                    >
                        取消
                    </Button>
            </div>
        </div>
    );


}
