import { Role } from "constants/role.enum";
import {
    BIDS_PATHNAME,
    COURSES_PATHNAME,
    NEWS_PATHNAME,
    PROFILE_BIDS_PATHNAME,
    PROFILE_COURSES_PATHNAME,
    PROFILE_PATHNAME,
    PROFILE_SUBJECTS_PATHNAME,
    USERS_PATHNAME,
} from "constants/routesPathnames";

export interface NavLink {
    label: string;
    path: string;
    id: number;
    roles?: Role[];
}

export const adminSubNavLinks: NavLink[] = [
    { label: "Пользователи", path: USERS_PATHNAME, id: 1 },
    { label: "Заявки", path: BIDS_PATHNAME, id: 2 },
    { label: "Новости", path: NEWS_PATHNAME, id: 3 },
    { label: "Курсы", path: COURSES_PATHNAME, id: 4 },
];

export const profileSubNavLinks: NavLink[] = [
    {
        label: "Профиль",
        path: PROFILE_PATHNAME,
        id: 1,
    },
    {
        label: "Курсы",
        path: PROFILE_COURSES_PATHNAME,
        id: 2,
        roles: [Role.SUPERVISOR],
    },
    {
        label: "Предметы",
        path: PROFILE_SUBJECTS_PATHNAME,
        id: 3,
        roles: [Role.TEACHER, Role.STUDENT],
    },
    {
        label: "Заявки",
        path: PROFILE_BIDS_PATHNAME,
        id: 4,
        roles: [Role.ENROLLEE],
    },
];
