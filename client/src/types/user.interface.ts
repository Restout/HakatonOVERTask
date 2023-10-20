import { Role } from "constants/role.enum";

export interface IUser {
    firstName: string;
    lastName: string;
    fatherName: string;
    birthday: string;
    email: string;
    phone: string;
    id: number;
    role: Role;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    birthday: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    phone: string;
}
