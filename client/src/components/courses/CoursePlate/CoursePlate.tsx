import { FC } from "react";

import styles from "./coursePlate.module.scss";

interface Props {}

const CoursePlate: FC<Props> = () => {
    return (
        <article className={styles.plate}>
            <header>
                <span>03.03.03</span>
                <h4>
                    Обучение работы с SPA приложением для Java разработчиков.
                </h4>
            </header>
            <div>
                <p>
                    В рамках образовательной программы ведется подготовка
                    специалистов, сочетающих глубокое знание теоретической базы
                    SPA приложений. Также разработчикам предоставляется
                    возможность вовремя одуматься и стать человеком путем
                    перехода на frontend-разработку.
                </p>
            </div>
        </article>
    );
};

export default CoursePlate;
