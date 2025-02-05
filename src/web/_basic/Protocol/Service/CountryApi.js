import axios from 'axios';
import { Protocol } from '../Protocol';

export class CountryApi {
    static COUNTRY = `${Protocol.API_URL}/countries`;

    static GET_ALL_COUNTRY = `${this.COUNTRY}/allCountry`;  //取得所有足跡
    static GET_ALL = `${this.COUNTRY}/all`;  //取得所有國家資料
    static POST_NEW_COUNTRY = `${this.COUNTRY}/create`;
    static DELETE_COUNTRY = `${this.COUNTRY}/delete`;
    static PUT_COUNTRY = `${this.COUNTRY}/update`;

    
    static async getAllCountry(formData) {
        try {
            const response = await axios.get(this.GET_ALL_COUNTRY, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async getAll(formData) {
        try {
            const response = await axios.get(this.GET_ALL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewCountry(formData) {
        try {
            const response = await axios.post(this.POST_NEW_COUNTRY, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putCountry(id, formData) {
        try {
            const response = await axios.put(`${this.PUT_COUNTRY}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCountry(id) {
        try {
            const response = await axios.delete(`${this.DELETE_COUNTRY}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    

    
}