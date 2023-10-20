import { api, authApi } from "api";

import {
    IUser,
    LoginCredentials,
    RegisterCredentials,
} from "types/user.interface";

import { LocalStorageKeys } from "constants/localStorageKeys";
import { Role } from "constants/role.enum";

import { PaginationParams } from "./types";

class UserService {
    static register = async (credentials: RegisterCredentials) => {
        return api.post<void>("/registration", credentials);
    };

    static login = async (credentials: LoginCredentials) => {
        return api.post<IUser>("/login", credentials);
    };

    static refresh = async () => {
        return api.get<IUser>("/refresh", {
            headers: {
                Authorization: `${localStorage.getItem(
                    LocalStorageKeys.token,
                )}`,
            },
        });
    };

    static getAll = async ({ limit, page }: PaginationParams, role?: Role) => {
        return authApi.get<IUser[]>("/users/all", {
            params: { role, page, size: limit },
        });
    };

    static getById = async (userId: number) => {
        return authApi.get<IUser>(`/users/one`, { params: { id: userId } });
    };
}

export default UserService;
