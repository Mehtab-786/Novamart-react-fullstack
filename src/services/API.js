// src/api/userApi.js
import axios from "axios";
import Cookies from "js-cookie";

export async function registerUser(data) {
    const options = {
        method: 'POST',
        url: 'https://api.freeapi.app/api/v1/users/register',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: {
            email: data.email,
            password: data.password,
            role: 'USER',
            username: data.username
        }
        // role: 'ADMIN',
    };

    try {
        const response = await axios.request(options);
        return response
    } catch (error) {
        console.error(error);
    }
}


export async function getCurrentUser() {

    const options = {
        method: 'GET',
        url: 'https://api.freeapi.app/api/v1/users/current-user',
        headers: { accept: 'application/json', 'content-type': 'application/json'},
    };

    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.log('error while getting current user ::', error);
        throw error;
    }
}


export async function loginUser(data) {
    const options = {
        method: 'POST',
        url: 'https://api.freeapi.app/api/v1/users/login',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: { password: data.password, username: data.username }
    };

    try {
        const { data } = await axios.request(options);
        return data
    } catch (error) {
        console.error(error);
    }
}

export async function generateAccessToken() {
    
    const options = {
        method: 'POST',
        url: 'https://api.freeapi.app/api/v1/users/refresh-token',
        headers: { accept: 'application/json', 'content-type': 'application/json'}

        // data: { refreshToken } // send refreshToken in the body, not in headers!
    };

    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }
}

// Logout helper
export function logoutClientSide() {
}


