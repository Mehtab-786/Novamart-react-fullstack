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

export async function loginUser(data) {
    try {
        const userData = await instance.post('/auth/login', data);
        console.log(userData);
        return userData;
    } catch (error) {
        console.warn('Error while logging user', error);
    };
};

export async function currentUser() {
    try {
        const userData = await instance.get('/auth/getme');
        console.log(userData);
        return userData;
    } catch (error) {
        console.warn('Error while fetching current user', error);
    };
};

export async function logoutUser() {
    try {
        const userData = await instance.get('/auth/logout');
        console.log(userData);
        return userData;
    } catch (error) {
        console.warn('Error while logging out user', error);
    };
};

export async function generateAccessToken() {
    try {
        const userData = await instance.get('/auth/access-token');
        console.log(userData);
        return userData;
    } catch (error) {
        console.warn('Error while generating new access token', error);
    };
};

