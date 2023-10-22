import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import useTypedSelector from "hooks/shared/useTypedSelector";

import LessonService from "services/LessonService";

import { ILesson } from "types/lesson.interface";
import { IUser } from "types/user.interface";

import { Role } from "constants/role.enum";
import { PROGRAM_PATHNAME } from "constants/routesPathnames";

import studyingSrc from "assets/img/studying.jpg";

import styles from "./profileSubjects.module.scss";

const ProfileSubjects: FC = () => {
    const { id: userId, role } = useTypedSelector(
        (state) => state.user.user,
    ) as IUser;

    const {
        data: studentLessons,
        isLoading: isStudentLoading,
        isError: isStudentError,
        isSuccess: isStudentSuccess,
    } = useQuery({
        queryFn: () => LessonService.getByUserId(userId),
        queryKey: ["lessons", userId, "student"],
        select: (data) => data.data,
        enabled: role === Role.STUDENT,
    });

    const {
        data: teacherLessons,
        isLoading: isTeacherLoading,
        isError: isTeacherError,
        isSuccess: isTeacherSuccess,
    } = useQuery({
        queryFn: () => LessonService.getByUserId(userId),
        queryKey: ["lessons", userId, "teacher"],
        select: (data) => data.data,
        enabled: role === Role.TEACHER,
    });

    const isLoading = isTeacherLoading && isStudentLoading;
    const isError = isStudentError && isTeacherError;

    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Мои предметы</Title>
                {isStudentSuccess && studentLessons.length > 0 && (
                    <StudentLessons lessons={studentLessons} />
                )}
                {isTeacherSuccess && teacherLessons.length > 0 && (
                    <TeacherLessons lessons={teacherLessons} />
                )}
                <Error
                    message={
                        isError
                            ? "Что-то пошло не так, попробуйте еще раз"
                            : null
                    }
                />
                <Loading isLoading={isLoading} />
            </Container>
        </section>
    );
};

export default ProfileSubjects;

function TeacherLessons({ lessons }: { lessons: ILesson[] }) {
    return (
        <div className={styles.subjects}>
            <ul className={styles.lessonsList}>
                {lessons.map((lesson) => (
                    <li key={lesson.lessonId}>
                        <Link to={`/${PROGRAM_PATHNAME}/${lesson.lessonId}`}>
                            <div className={styles.lessonImage}>
                                <img src={studyingSrc} alt="Предмет" />
                            </div>
                            <div className={styles.lessonContent}>
                                <h5>{lesson.lessonName}</h5>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function StudentLessons({ lessons }: { lessons: ILesson[] }) {
    return (
        <div className={styles.subjects}>
            <ul className={styles.lessonsList}>
                {lessons.map((lesson) => (
                    <li key={lesson.lessonId}>
                        <Link to={`/${PROGRAM_PATHNAME}/${lesson.lessonId}`}>
                            <div className={styles.lessonImage}>
                                <img src={studyingSrc} alt="Предмет" />
                            </div>
                            <div className={styles.lessonContent}>
                                <h5>{lesson.lessonName}</h5>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}
