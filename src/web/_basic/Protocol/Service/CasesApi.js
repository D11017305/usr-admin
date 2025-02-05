import axios from 'axios';
import { Protocol } from '../Protocol';

export class CasesApi {
    static CASES = `${Protocol.API_URL}/cases`;

    static GET_ALL_CASES = `${this.CASES}/allCases`;  //取得所有國家
    static POST_NEW_CASES = `${this.CASES}/create`;
    static DELETE_CASES = `${this.CASES}/delete`;
    static PUT_CASES = `${this.CASES}/update`;

    static async getAllCases(formData) {
        try {
            const response = await axios.get(this.GET_ALL_CASES, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewCases(formData) {
        try {
            const response = await axios.post(this.POST_NEW_CASES, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putCases(id, formData) {
        try {
            const response = await axios.put(`${this.PUT_CASES}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCase(id) {
        try {
            const response = await axios.delete(`${this.DELETE_CASES}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    
}