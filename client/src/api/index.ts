import axios from "axios";

import { LocalStorageKeys } from "constants/localStorageKeys";

export const API_URL = window.location.origin;
// export const API_URL = "http://localhost:8097";

export const api = axios.create({
    baseURL: `${API_URL}/api`,
});

export const authApi = axios.create({
    baseURL: `${API_URL}/api/auth`,
});

authApi.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem(
        LocalStorageKeys.token,
    )}`;
    return config;
});
