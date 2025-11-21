import instance from '../Utils/AxiosInstance';

export async function registerUser(data) {
    try {
        const userData = await instance.post('/auth/register', data);
        console.log(userData);
        return userData;
    } catch (error) {
        console.warn('Error while registering user', error);
    };
};