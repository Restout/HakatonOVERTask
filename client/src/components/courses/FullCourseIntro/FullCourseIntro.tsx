import { FC } from "react";

import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Button } from "components/ui/Button";

import { ICourse } from "types/course.interface";

import styles from "./fullCourseIntro.module.scss";

interface Props {
    openEnrol: () => void;
    isEnrolling: boolean;
    course: ICourse;
}

const FullCourseIntro: FC<Props> = ({ openEnrol, isEnrolling, course }) => {
    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.content}>
                    <h1 className={styles.title}>{course.courseName}</h1>
                    {course.isParticipant ? (
                        <Link to={""}>
                            <Button
                                variant="light-blue"
                                onClick={openEnrol}
                                disabled={isEnrolling}
                            >
                                Перейти к материалам курса
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            variant="light-blue"
                            onClick={openEnrol}
                            disabled={isEnrolling}
                        >
                            {isEnrolling
                                ? "Заполните форму"
                                : "Записаться на курс"}
                        </Button>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default FullCourseIntro;
