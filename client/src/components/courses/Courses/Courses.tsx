import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import CoursesService from "services/CoursesService";

import { COURSES_PATHNAME } from "constants/routesPathnames";

import { CoursePlate } from "../CoursePlate";
import styles from "./courses.module.scss";

const Courses: FC = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["courses"],
        queryFn: CoursesService.getAll,
        select(data) {
            return data.data;
        },
    });

    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Выбор курсов</Title>
                {isSuccess && (
                    <ul className={styles.coursesList}>
                        {data.map((course) => (
                            <li key={course.courseId}>
                                <Link
                                    to={`/${COURSES_PATHNAME}/${course.courseId}`}
                                >
                                    <CoursePlate course={course} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <Error message={isError ? "Something went wrong" : null} />
                <Loading isLoading={isLoading} />
            </Container>
        </section>
    );
};

export default Courses;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}
