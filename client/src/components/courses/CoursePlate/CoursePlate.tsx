import { FC, MouseEvent } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "components/ui/Button";

import { COURSES_PATHNAME, PROGRAM_PATHNAME } from "constants/routesPathnames";

import styles from "./coursePlate.module.scss";

interface Props {
    isParticipant?: boolean;
}

const CoursePlate: FC<Props> = ({ isParticipant }) => {
    const navigate = useNavigate();
    const handleNavigateToMaterials = (
        event: MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        navigate(`/${COURSES_PATHNAME}/1/${PROGRAM_PATHNAME}`);
    };

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
            {isParticipant && (
                <footer>
                    <Button onClick={handleNavigateToMaterials}>
                        Перейти к материалам курса
                    </Button>
                </footer>
            )}
        </article>
    );
};

export default CoursePlate;
