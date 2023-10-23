import { FC } from "react";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { HOME_PATH } from "constants/routesPathnames";

import styles from "./missingPage.module.scss";

const MissingPage: FC = () => {
    return (
        <div className={styles.page}>
            <Meta />
            <div>
                <h1>404</h1>
                <p>Такой страницы не существует</p>
                <Link to={HOME_PATH}>Хотите перейти на главную?</Link>
            </div>
        </div>
    );
};

export default MissingPage;

function Meta() {
    return (
        <Helmet>
            <title>Page not found | 404</title>
        </Helmet>
    );
}
