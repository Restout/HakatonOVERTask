import axios from "axios";

import { LocalStorageKeys } from "constants/localStorageKeys";

export const api = axios.create({
    baseURL: "http://91.107.125.88:8097/api",
});

export const authApi = axios.create({
    baseURL: "http://91.107.125.88:8097/api/auth",
});

authApi.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem(
        LocalStorageKeys.token,
    )}`;
    return config;
});
