import { ReactNode } from "react";

import cn from "clsx";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";

import { HOME_PATH } from "constants/routesPathnames";

import logo from "assets/img/logo.svg";

import { ProfileButton } from "./ProfileButton";
import styles from "./header.module.scss";

interface Props {
    renderNav: () => ReactNode;
    className?: string;
}

const Header = ({ renderNav, className }: Props) => {
    return (
        <header className={cn(styles.header, className)}>
            <Container>
                <div className={styles.wrapper}>
                    <a className={styles.logo} href={HOME_PATH}>
                        <img src={logo} alt="Logo" />
                    </a>
                    <div className={styles.controls}>
                        {renderNav()}
                        <ProfileButton />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;

Header.Link = ({ to, children }: { to: string; children: ReactNode }) => {
    return (
        <Link to={to} className={styles.link}>
            {children}
        </Link>
    );
};
