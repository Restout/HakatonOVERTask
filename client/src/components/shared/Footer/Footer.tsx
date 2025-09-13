import { FC } from "react";

import { Link } from "react-router-dom";

import { HOME_PATH } from "constants/routesPathnames";

import telegram from "assets/img/icons/telegram.svg";
import vk from "assets/img/icons/vk.svg";

import { Container } from "../Container";
import styles from "./footer.module.scss";

const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.wrapper}>
                    <div>
                        <h5 className={styles.title}>
                            Веб-приложения совместной работы
                        </h5>
                        <p className={styles.text}>
                            Политика конфиденциальности
                        </p>
                        <Link className={styles.logo} to={HOME_PATH}>
                        </Link>
                    </div>
                    <div>
                        <h5 className={styles.title}>Контакты</h5>
                        <p className={styles.text}>@mail.com</p>
                        <p className={styles.text}>+7 (999)-999-99-99</p>
                        <p className={styles.text}>ул. Учебная д.50</p>
                    </div>
                    <div>
                        <h5 className={styles.title}>Наши соц.сети</h5>
                        <div className={styles.socialList}>
                            <img src={vk} alt="ВКонтакте" />
                            <img src={telegram} alt="Телеграм" />
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
