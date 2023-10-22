import { FC } from "react";

import WithAuth from "hocs/WithAuth";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Button } from "components/ui/Button";

import { useAuth } from "hooks/auth/useAuth";

import { ICourse } from "types/course.interface";

import { Role } from "constants/role.enum";

import styles from "./fullCourseIntro.module.scss";

interface Props {
    openEnrol: () => void;
    isEnrolling: boolean;
    course: ICourse;
}

const FullCourseIntro: FC<Props> = ({ openEnrol, isEnrolling, course }) => {
    const { isAuth } = useAuth();

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.content}>
                    <h1 className={styles.title}>{course.courseName}</h1>
                    {!isAuth && (
                        <p>Войдите в систему, чтобы записаться на курс</p>
                    )}
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
                        <WithAuth
                            authChildren={
                                <Button
                                    variant="light-blue"
                                    onClick={openEnrol}
                                    disabled={isEnrolling}
                                >
                                    {isEnrolling
                                        ? "Заполните форму"
                                        : "Записаться на курс"}
                                </Button>
                            }
                            unAuthChildren={null}
                            allowedRoles={[Role.ENROLLEE]}
                        />
                    )}
                </div>
            </Container>
        </section>
    );
};

export default FullCourseIntro;
