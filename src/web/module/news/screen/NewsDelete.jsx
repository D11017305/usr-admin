import { Button } from '@mui/material';
import { NewsApi } from '../../../_basic/Protocol/NewsApi';
import "../style/NewsAdd.css";


export default function NewsDelete({ closeModal, record, setData }) {

    const handleDelete = async () => {
        try {
                await NewsApi.deleteNews(record.id);
                console.log("刪除成功");
                closeModal(); 
                setData(prevData => prevData.filter(item => item.id !== record.id));
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
