import { FC } from "react";

import cn from "clsx";
import WithAuth from "hocs/WithAuth";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";

import { useLogout } from "hooks/auth/useLogout";

import { Role } from "constants/role.enum";
import {
    ADMIN_PATHNAME,
    BIDS_PATHNAME,
    COURSES_PATHNAME,
    HOME_PATH,
    LK_PATHNAME,
    PROFILE_PATHNAME,
    SCHEDULE_PATHNAME,
    SIGN_IN_PATH,
    USERS_PATHNAME,
} from "constants/routesPathnames";

import logo from "assets/img/logo.svg";

import styles from "./header.module.scss";

interface Props {
    className?: string;
}

const Header: FC<Props> = ({ className }) => {
    const logout = useLogout();

    return (
        <header className={cn(styles.header, className)}>
            <Container>
                <div className={styles.wrapper}>
                    <Link className={styles.logo} to={HOME_PATH}>
                        <img src={logo} alt="Logo" />
                    </Link>
                    <div className={styles.controls}>
                        <Link
                            className={styles.link}
                            to={"/" + SCHEDULE_PATHNAME}
                        >
                            Расписание
                        </Link>
                        <Link
                            className={styles.link}
                            to={"/" + COURSES_PATHNAME}
                        >
                            Курсы
                        </Link>
                        <WithAuth
                            authChildren={
                                <Link
                                    className={styles.link}
                                    to={"/" + BIDS_PATHNAME}
                                >
                                    Заявки
                                </Link>
                            }
                            unAuthChildren={null}
                            allowedRoles={[
                                Role.MANAGER,
                                Role.SELLECTION_COMMITE,
                            ]}
                        />
                        <WithAuth
                            authChildren={
                                <Link
                                    className={styles.link}
                                    to={`/${ADMIN_PATHNAME}/${USERS_PATHNAME}`}
                                >
                                    Админ панель
                                </Link>
                            }
                            unAuthChildren={null}
                            allowedRoles={[Role.ADMIN]}
                        />
                        <WithAuth
                            authChildren={
                                <Link
                                    className={styles.link}
                                    to={`/${LK_PATHNAME}/${PROFILE_PATHNAME}`}
                                >
                                    Профиль
                                </Link>
                            }
                            unAuthChildren={null}
                            allowedRoles={[
                                Role.ADMIN,
                                Role.ENROLLEE,
                                Role.MANAGER,
                                Role.SELLECTION_COMMITE,
                                Role.STUDENT,
                                Role.SUPERVISOR,
                                Role.TEACHER,
                            ]}
                        />
                        <WithAuth
                            authChildren={
                                <button
                                    className={styles.link}
                                    onClick={logout}
                                >
                                    Выйти
                                </button>
                            }
                            unAuthChildren={
                                <Link to={SIGN_IN_PATH} className={styles.link}>
                                    Войти
                                </Link>
                            }
                        />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
