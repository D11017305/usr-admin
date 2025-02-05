import axios from 'axios';
import { Protocol } from './Protocol';

export class CarouselApi {
    static CAROUSEL = `${Protocol.API_URL}/carousel`;

    static GET_ALL_CAROUSEL = `${this.CAROUSEL}/allCarousel`;  //取得所有輪播圖
    static GET_CAROUSEL_ID = `${this.CAROUSEL}/`; //用ID搜尋輪播圖
    static POST_CAROUSEL = `${this.CAROUSEL}/create`; //新增輪播圖
    static PUT_CAROUSEL = `${this.CAROUSEL}/update`//修改輪播圖
    static DELETE_CAROUSEL = `${this.CAROUSEL}/delete`

    // api/carousel/allCarousel
    static async getAllCarousel() {
        try {
            const response = await axios.get(this.GET_ALL_CAROUSEL, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
    // static async getCarouselById(carousel_Id) {
    //     console.log(this.GET_CAROUSEL_ID);
    //     try {
    //         const response = await axios.get(`${this.GET_CAROUSEL_ID}${carousel_Id}`);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    static async postNewCarousel(formData) {
        // console.log(this.POST_CAROUSEL);
        // console.log(formData);
        try {
            const response = await axios.post(this.POST_CAROUSEL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async putCarousel(id, formData) {
        console.log(this.PUT_CAROUSEL);
        try {
            const response = await axios.put(`${this.PUT_CAROUSEL}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCarousel(id) {
        console.log(this.DELETE_CAROUSEL);
        try {
            const response = await axios.delete(`${this.DELETE_CAROUSEL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
