import axios from 'axios';
import { Protocol } from './Protocol';

export class AchievementsApi {
    static ACHIEVEMENTS = `${Protocol.API_URL}/achievements`;

    static GET_ALL_ACHIEVEMENTS = `${this.ACHIEVEMENTS}/allAchievements`;  //取得所有成果展現
    static POST_ACHIEVEMENTS = `${this.ACHIEVEMENTS}/create`;
    static PUT_ACHIEVEMENTS = `${this.ACHIEVEMENTS}/update`;
    static DELETE_ACHIEVEMENTS = `${this.ACHIEVEMENTS}/delete`;

    static async getAllAchievements(formData) {
        try {
            const response = await axios.get(this.GET_ALL_ACHIEVEMENTS, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async postNewAchievements(formData) {
        try {
            const response = await axios.post(this.POST_ACHIEVEMENTS, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putAchievements(id,formData) {
        try {
            const response = await axios.put(`${this.PUT_ACHIEVEMENTS}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteActivity(id) {
        try {
            const response = await axios.delete(`${this.DELETE_ACHIEVEMENTS}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
}