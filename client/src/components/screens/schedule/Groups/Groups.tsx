import { FC } from "react";

import cn from "clsx";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import { SCHEDULE_PATH } from "constants/routesPathnames";

import styles from "./groups.module.scss";

interface Props {}

const groupsList = [
    "513123",
    "123154",
    "123999",
    "213855",
    "123562",
    "958543",
    "456423",
    "654145",
    "324534",
];

const Groups: FC<Props> = () => {
    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Учебные группы</Title>
                <ul className={styles.groupsList}>
                    {groupsList.map((group) => (
                        <li key={group}>
                            <Link to={`${SCHEDULE_PATH}/${group}`}>
                                {group}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
};

export default Groups;
