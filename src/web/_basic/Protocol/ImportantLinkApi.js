import axios from 'axios';
import { Protocol } from './Protocol';

export class ImportantLinkApi {
    static IMPORT_LINK = `${Protocol.API_URL}/importLink`;

    static GET_ALL_IMPORT_LINK = `${this.IMPORT_LINK}/allImportLink`;  //取得所有重要連結
    static POST_NEW_IMPORT_LINK = `${this.IMPORT_LINK}/create`;
    static DELETE_NEW_IMPORT_LINK = `${this.IMPORT_LINK}/delete`;
    static PUT_IMPORT_LINK= `${this.IMPORT_LINK}/update`

    static async getAllImportLink(formData) {
        try {
            const response = await axios.get(this.GET_ALL_IMPORT_LINK, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewImportLink(formData) {
        try {
            const response = await axios.post(this.POST_NEW_IMPORT_LINK, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putImportantLink(id, formData) {
        try {
            const response = await axios.put(`${this.PUT_IMPORT_LINK}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteImportLink(id) {
        try {
            const response = await axios.delete(`${this.DELETE_NEW_IMPORT_LINK}/${id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    
}