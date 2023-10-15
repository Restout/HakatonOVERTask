import axios from "axios";

export const api = axios.create({
    baseURL: "url",
});

export const authApi = axios.create({
    baseURL: "url",
    withCredentials: true,
});
