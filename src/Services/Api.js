import instance from '../Utils/AxiosInstance';

//product API's
export async function allProductsFetch() {
    try {
        const productData=await instance.get('/store/products');
        return productData?.data;
    } catch (error) {
        throw { message: error?.response?.data?.message || "Products Fetching Failed !", ...error?.response?.data };
    }
}