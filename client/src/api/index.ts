import axios from "axios";

import { LocalStorageKeys } from "constants/localStorageKeys";

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

export const authApi = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api/auth`,
});

authApi.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem(
        LocalStorageKeys.token,
    )}`;
    return config;
});
