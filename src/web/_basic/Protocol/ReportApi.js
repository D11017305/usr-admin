import axios from 'axios';
import { Protocol } from './Protocol';

export class ReportApi {
    static REPORT = `${Protocol.API_URL}/report`;

    static GET_ALL_REPORT = `${this.REPORT}/allReport`;  //取得所有重要連結
    static POST_NEW_REPORT = `${this.REPORT}/create`;
    static DELETE_NEW_REPORT = `${this.REPORT}/delete`;
    static PUT_REPORT= `${this.REPORT}/update`

    static async getAllReport(formData) {
        try {
            const response = await axios.get(this.GET_ALL_REPORT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewReport(formData) {
        try {
            const response = await axios.post(this.POST_NEW_REPORT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putReport(id, formData) {
        try {
            const response = await axios.put(`${this.PUT_REPORT}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteReport(id) {
        try {
            const response = await axios.delete(`${this.DELETE_NEW_REPORT}/${id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    
}