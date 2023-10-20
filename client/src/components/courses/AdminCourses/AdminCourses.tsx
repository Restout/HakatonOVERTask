import { FC, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import CoursesService from "services/CoursesService";

import { COURSES_PATHNAME } from "constants/routesPathnames";

import { CoursePlate } from "../CoursePlate";
import { CoursesCreation } from "../CoursesCreation";
import styles from "./adminCourses.module.scss";

const AdminCourses: FC = () => {
    const [isAdding, setIsAdding] = useState(false);

    const { data, isSuccess, isError, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: () => CoursesService.getAll(),
        select(data) {
            return data.data;
        },
    });

    return (
        <section className={styles.section}>
            <Container>
                <header className={styles.header}>
                    <Title className={styles.title}>Управление курсами</Title>
                    <Button
                        variant="dark-blue"
                        onClick={() => setIsAdding((prev) => !prev)}
                    >
                        {isAdding ? "Отменить" : "Добавить"}
                    </Button>
                </header>
                {isAdding && (
                    <CoursesCreation
                        className={styles.creation}
                        close={() => setIsAdding(false)}
                    />
                )}
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

export default AdminCourses;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}
