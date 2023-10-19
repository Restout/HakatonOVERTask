import { FC } from "react";

import cn from "clsx";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";

import {
    ADMIN_PATHNAME,
    BIDS_PATHNAME,
    COURSES_PATHNAME,
    HOME_PATH,
    SCHEDULE_PATHNAME,
    USERS_PATHNAME,
} from "constants/routesPathnames";

import logo from "assets/img/logo.svg";

import { ProfileButton } from "./ProfileButton";
import styles from "./header.module.scss";

interface Props {
    className?: string;
}

const Header: FC<Props> = ({ className }) => {
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
                        <Link className={styles.link} to={"/" + BIDS_PATHNAME}>
                            Заявки
                        </Link>
                        <Link
                            className={styles.link}
                            to={`/${ADMIN_PATHNAME}/${USERS_PATHNAME}`}
                        >
                            Админ панель
                        </Link>
                        <ProfileButton className={styles.link} />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
