import { FC } from "react";

import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import { CoursePlate } from "../CoursePlate";
import styles from "./courses.module.scss";

const Courses: FC = () => {
    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Выбор направления подготовки</Title>
                <ul className={styles.coursesList}>
                    <li>
                        <Link to={"1"}>
                            <CoursePlate />
                        </Link>
                    </li>
                    <li>
                        <Link to={"2"}>
                            <CoursePlate />
                        </Link>
                    </li>
                    <li>
                        <Link to={"3"}>
                            <CoursePlate />
                        </Link>
                    </li>
                    <li>
                        <Link to={"4"}>
                            <CoursePlate />
                        </Link>
                    </li>
                </ul>
            </Container>
        </section>
    );
};

export default Courses;
