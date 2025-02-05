import axios from 'axios';
import { Protocol } from './Protocol';

export class NewsApi {
    static NEWS = `${Protocol.API_URL}/news`;

    static GET_ALL_NEWS = `${this.NEWS}/allNews`;  //取得所有亮點報導
    static GET_NEW_NEWS = `${this.NEWS}/create`;
    static PUT_NEW_NEWS = `${this.NEWS}/update`;
    static DELETE_NEW_NEWS = `${this.NEWS}/delete`;

    static async getAllNews(formData) {
        try {
            const response = await axios.get(this.GET_ALL_NEWS, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewNews(formData) {
        try {
            const response = await axios.post(this.GET_NEW_NEWS, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    

    static async putNews(id, formData) {
        try {
            const response = await axios.put(`${this.PUT_NEW_NEWS}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteNews(id) {
        try {
            const response = await axios.delete(`${this.DELETE_NEW_NEWS}/${id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    

    
}