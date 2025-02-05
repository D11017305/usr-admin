import axios from 'axios';
import { Protocol } from '../Protocol';

export class RegionApi {
    static REGION = `${Protocol.API_URL}/regions`;

    static GET_ALL_REGION = `${this.REGION}/allRegions`;  //取得所有國家
    static POST_NEW_REGION = `${this.REGION}/create`;
    static PUT_REGION = `${this.REGION}/update`;
    static DELETE_REGION = `${this.REGION}/delete`;

    static async getAllRegion(formData) {
        try {
            const response = await axios.get(this.GET_ALL_REGION, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewRegion(formData) {
        try {
            const response = await axios.post(this.POST_NEW_REGION, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteRegion(id) {
        try {
            const response = await axios.delete(`${this.DELETE_REGION}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putRegion(id, formData) {
        try {
            const response = await axios.put(`${this.PUT_REGION}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}