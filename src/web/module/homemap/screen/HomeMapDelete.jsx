import { Button } from '@mui/material';
import { HomeMapApi } from '../../../_basic/Protocol/HomeMapApi';
import "../style/HomeMapAdd.css";


export default function HomeMapDelete({ closeModal, record, setData }) {

    const handleDelete = async () => {
        try {
                await HomeMapApi.deleteHomeMap(record.id);
                console.log("刪除成功");
                closeModal(); 
                setData(prevData => prevData.filter(item => item.id !== record.id)); // 修正這裡
            } catch (error) {
                console.error("刪除失敗", error.response.data);
                alert("刪除失敗，請稍後再試。");
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
