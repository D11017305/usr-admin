import axios from 'axios';
import { Protocol } from './Protocol';

export class LoginApi {
    static LOGIN = `${Protocol.API_URL}/loginUsrAdmin`;

    static POST_LOGIN = `${this.LOGIN}/login`;

    static async postLogin(formData) {
        try {
            const response = await axios.post(this.POST_LOGIN, formData, {
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