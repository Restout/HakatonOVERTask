import { FC } from "react";

import cn from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";

import {
    BIDS_PATH,
    CREATE_COURSES_PATH,
    CREATE_NEWS_PATH,
    USERS_PATH,
} from "constants/routesPathnames";

import styles from "./adminLayout.module.scss";

const navLinks = [
    { label: "Пользователи", path: USERS_PATH, id: 1 },
    { label: "Заявки", path: BIDS_PATH, id: 2 },
    { label: "Новости", path: CREATE_NEWS_PATH, id: 3 },
    { label: "Курсы", path: CREATE_COURSES_PATH, id: 4 },
];

const AdminLayout: FC = () => {
    const { pathname } = useLocation();

    return (
        <>
            <nav className={styles.navigation}>
                <ul>
                    {navLinks.map(({ id, label, path }) => (
                        <li key={id}>
                            <Link
                                className={cn(
                                    pathname.includes(path) && styles.active,
                                )}
                                to={path}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Outlet />
        </>
    );
};

export default AdminLayout;
