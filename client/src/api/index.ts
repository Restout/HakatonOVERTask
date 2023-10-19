import axios from "axios";

// export const api = axios.create({
//     baseURL: "http://91.107.125.88:8097/api",
// });

export const api = axios.create({
    baseURL: "http://localhost:8097/api",
});

export const authApi = axios.create({
    baseURL: "http://localhost:8097/api/auth",
});

// export const authApi = axios.create({
//     baseURL: "http://91.107.125.88:8097/api/auth",
//     withCredentials: true,
// });
