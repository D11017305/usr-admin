import axios from 'axios';
import { Protocol } from './Protocol';

export class PartnerApi {
    static PARTNER = `${Protocol.API_URL}/Partner`;

    static GET_ALL_PARTNER = `${this.PARTNER}/allPartner`;  //取得所有成果展現
    static POST_PARTNER = `${this.PARTNER}/create`;
    static PUT_PARTNER = `${this.PARTNER}/update`;
    static DELETE_PARTNER = `${this.PARTNER}/delete`;

    static async getAllPartner(formData) {
        try {
            const response = await axios.get(this.GET_ALL_PARTNER, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewPartner(formData) {
        try {
            const response = await axios.post(this.POST_PARTNER, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putPartner(id,formData) {
        try {
            const response = await axios.put(`${this.PUT_PARTNER}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deletePartner(id) {
        try {
            const response = await axios.delete(`${this.DELETE_PARTNER}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
}