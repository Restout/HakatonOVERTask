import { FC } from "react";

import { Link } from "react-router-dom";

import { CoursePlate } from "components/courses/CoursePlate";
import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import { COURSES_PATHNAME } from "constants/routesPathnames";

import styles from "./profileCourses.module.scss";

const ProfileCourses: FC = () => {
    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Мои курсы</Title>
                <ul className={styles.coursesList}>
                    <li>
                        <Link to={`/${COURSES_PATHNAME}/1`}>
                            <CoursePlate isParticipant={true} />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/${COURSES_PATHNAME}/1`}>
                            <CoursePlate isParticipant={true} />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/${COURSES_PATHNAME}/1`}>
                            <CoursePlate isParticipant={true} />
                        </Link>
                    </li>
                    <li>
                        <Link to={`/${COURSES_PATHNAME}/1`}>
                            <CoursePlate isParticipant={true} />
                        </Link>
                    </li>
                </ul>
            </Container>
        </section>
    );
};

export default ProfileCourses;
