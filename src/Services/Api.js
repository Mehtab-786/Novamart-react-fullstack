import instance from '../Utils/AxiosInstance';

export async function registerUser(data) {
    try {
        const userData = await instance.post('/auth/register', data);
        return userData?.data;
    } catch (error) {
        throw { message: error?.response?.data?.message || "Registration failed", ...error?.response?.data };
    };
};

export async function loginUser(data) {
    try {
        const userData = await instance.post('/auth/login', data);
        console.log(userData);
        return userData.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw { message: error?.response?.data?.message || "Login failed", ...error?.response?.data };
    }
};

export async function currentUser() {
    try {
        const userData = await instance.get('/auth/getme');
        console.log(userData);
        return userData;
    } catch (error) {
        console.log('Error while fetching current user', error);
        throw { message: error?.response?.data?.message || "Fetch current user failed", ...error?.response?.data };
    }
};

export async function logoutUser() {
    try {
        const userData = await instance.get('/auth/logout');
        console.log(userData);
        return userData;
    } catch (error) {
        console.log('Error while logging out user', error);
        throw { message: error?.response?.data?.message || "Logout failed", ...error?.response?.data };
    }
};

export async function generateAccessToken() {
    try {
        const userData = await instance.get('/auth/access-token');
        console.log(userData);
        return userData;
    } catch (error) {
        console.log('Error while generating new access token', error);
        throw { message: error?.response?.data?.message || "Generate access token failed", ...error?.response?.data };
    }
};
