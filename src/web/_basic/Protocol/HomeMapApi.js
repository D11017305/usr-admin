import axios from 'axios';
import { Protocol } from './Protocol';

export class HomeMapApi {
    static HOMEMAP = `${Protocol.API_URL}/homemaps`;

    static GET_ALL_HOMEMAP = `${this.HOMEMAP}/allHomeMaps`;  //取得所有成果展現
    static POST_HOMEMAP = `${this.HOMEMAP}/create`;
    static PUT_HOMEMAP = `${this.HOMEMAP}/update`;
    static DELETE_HOMEMAP = `${this.HOMEMAP}/delete`;

    static async getAllHomeMap(formData) {
        try {
            const response = await axios.get(this.GET_ALL_HOMEMAP, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewHomeMap(formData) {
        try {
            const response = await axios.post(this.POST_HOMEMAP, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putHomeMap(id,formData) {
        try {
            const response = await axios.put(`${this.PUT_HOMEMAP}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteHomeMap(id) {
        try {
            const response = await axios.delete(`${this.DELETE_HOMEMAP}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
}