import { Roles } from "constants/roles";

export interface BaseUser {
    firstName: string;
    lastName: string;
    patronymic: string;
    birthdate: string;
    email: string;
    phone: string;
}

export interface IUser {
    id: string;
    roles: Roles[];
}
