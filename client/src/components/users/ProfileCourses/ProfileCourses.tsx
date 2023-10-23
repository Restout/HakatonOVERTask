import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { CoursePlate } from "components/courses/CoursePlate";
import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import useTypedSelector from "hooks/shared/useTypedSelector";

import CoursesService from "services/CoursesService";

import { COURSES_PATHNAME } from "constants/routesPathnames";

import styles from "./profileCourses.module.scss";

const ProfileCourses: FC = () => {
    const userId = useTypedSelector((state) => state.user.user?.id) as number;

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["courses", userId],
        queryFn: () => CoursesService.getSupervisiorCourses(userId),
        select(data) {
            return data.data;
        },
    });

    return (
        <section className={styles.section}>
            <Meta />
            <Container>
                <Title className={styles.title}>Мои курсы</Title>
                {isSuccess && data.length < 1 && (
                    <Alert variant="info">Нет доступных курсов</Alert>
                )}
                {isSuccess && (
                    <ul className={styles.coursesList}>
                        {data.map((course) => (
                            <li key={course.courseId}>
                                <Link
                                    to={`/${COURSES_PATHNAME}/${course.courseId}`}
                                >
                                    <CoursePlate
                                        course={course}
                                        isParticipant={true}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
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

export default ProfileCourses;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}

function Meta() {
    return (
        <Helmet>
            <title>Profile | Courses</title>
            <meta name="description" content="Страница доступных курсов" />
        </Helmet>
    );
}
