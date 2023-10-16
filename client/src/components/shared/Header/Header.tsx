import { FC } from "react";

import cn from "clsx";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";

import {
    ADMIN_PATH,
    BIDS_PATH,
    COURSES_PATH,
    HOME_PATH,
    SCHEDULE_PATH,
    USERS_PATH,
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
                        <Link className={styles.link} to={SCHEDULE_PATH}>
                            Расписание
                        </Link>
                        <Link className={styles.link} to={COURSES_PATH}>
                            Курсы
                        </Link>
                        <Link className={styles.link} to={BIDS_PATH}>
                            Заявки
                        </Link>
                        <Link
                            className={styles.link}
                            to={`${ADMIN_PATH}/${USERS_PATH}`}
                        >
                            Админ панель
                        </Link>
                        <ProfileButton />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
