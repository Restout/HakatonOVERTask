import {
    BIDS_PATHNAME,
    COURSES_PATHNAME,
    NEWS_PATHNAME,
    PROFILE_COURSES_PATHNAME,
    PROFILE_PATHNAME,
    USERS_PATHNAME,
} from "constants/routesPathnames";

export interface NavLink {
    label: string;
    path: string;
    id: number;
}

export const adminSubNavLinks: NavLink[] = [
    { label: "Пользователи", path: USERS_PATHNAME, id: 1 },
    { label: "Заявки", path: BIDS_PATHNAME, id: 2 },
    { label: "Новости", path: NEWS_PATHNAME, id: 3 },
    { label: "Курсы", path: COURSES_PATHNAME, id: 4 },
];

export const profileSubNavLinks: NavLink[] = [
    { label: "Профиль", path: PROFILE_PATHNAME, id: 1 },
    { label: "Мои курсы", path: PROFILE_COURSES_PATHNAME, id: 2 },
];
