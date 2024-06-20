import { createAxiosClient } from "./createAxiosClient";
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const REFRESH_TOKEN_URL = 'http://localhost:3000/auth/refresh-token'
const BASE_URL = 'http://localhost:3000'


function getCurrentAccessToken() {
    return Cookies.get('accessToken')
}

function getCurrentRefreshToken() {
    const refreshToken= Cookies.get('refreshToken');
    return refreshToken;
}


function setRefreshedTokens(tokens) {
    Cookies.set('accessToken', tokens.accessToken);

    Cookies.set('refreshToken', tokens.refreshToken);
}

async function logout() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Session expired!',
        footer: '<a href="#">Why do I have this issue?</a>'
    }).then(() => {
        window.location.href = '/';
    });
}

export const client = createAxiosClient({
    options: {
        baseURL: BASE_URL,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    refreshTokenUrl: REFRESH_TOKEN_URL,
    logout,
    setRefreshedTokens
})