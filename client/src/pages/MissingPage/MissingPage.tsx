import { FC } from "react";

import { Link } from "react-router-dom";

import { HOME_PATH } from "constants/routesPathnames";

import styles from "./missingPage.module.scss";

const MissingPage: FC = () => {
    return (
        <div className={styles.page}>
            <div>
                <h1>404</h1>
                <p>Такой страницы не существует</p>
                <Link to={HOME_PATH}>Хотите перейти на главную?</Link>
            </div>
        </div>
    );
};

export default MissingPage;
