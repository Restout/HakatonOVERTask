import { FC } from "react";

import cn from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";

import { NavLink } from "components/Router/router.data";

import styles from "./subNavLayout.module.scss";

interface Props {
    navLinks: NavLink[];
}

const SubNavLayout: FC<Props> = ({ navLinks }) => {
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

export default SubNavLayout;
