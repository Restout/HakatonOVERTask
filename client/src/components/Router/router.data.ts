import { Role } from "constants/role.enum";
import {
    PROFILE_PATHNAME,
} from "constants/routesPathnames";

export interface NavLink {
    label: string;
    path: string;
    id: number;
    roles?: Role[];
}

export const profileSubNavLinks: NavLink[] = [
    {
        label: "Профиль",
        path: PROFILE_PATHNAME,
        id: 1,
    },
];
