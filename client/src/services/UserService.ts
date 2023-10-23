import { api, authApi } from "api";

import {
    IStudent,
    ITeacher,
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

    static grandStudent = async ({
        groupId,
        userId,
    }: {
        userId: number;
        groupId: number;
    }) => {
        return authApi.put("user/grand/student", {
            id: userId,
            groupId,
            recordBookId: 1,
        });
    };

    static getUserById = async (userId: number) => {
        return authApi.get<IUser>(`/users/one`, { params: { id: userId } });
    };

    static getStudent = async (studentId: number) => {
        return authApi.get<IStudent>(`/user/data/student/${studentId}`);
    };

    static getTeacher = async (teacherId: number) => {
        return authApi.get<ITeacher>(`/user/data/teacher/${teacherId}`);
    };

    static getMaterialsStudent = (lessonId: number, teacherId: number) => {
        return authApi.get<IUser[]>("/containerStudent", {
            params: { lessonId, teacherId },
        });
    };
}

export default UserService;
