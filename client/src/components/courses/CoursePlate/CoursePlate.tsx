import { FC, MouseEvent } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import WithAuth from "hocs/WithAuth";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "components/ui/Button";

import CoursesService from "services/CoursesService";

import { ICourse } from "types/course.interface";

import { Role } from "constants/role.enum";
import { COURSES_PATHNAME, PROGRAM_PATHNAME } from "constants/routesPathnames";

import deleteSrc from "assets/img/icons/delete.svg";

import styles from "./coursePlate.module.scss";

interface Props {
    course: ICourse;
    isParticipant?: boolean;
}

const CoursePlate: FC<Props> = ({ isParticipant, course }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate } = useMutation(
        () => CoursesService.delete(course.courseId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["courses"]);
            },
        },
    );

    const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        mutate();
    };

    const location = useLocation();
    const isAdminPage = location.pathname.includes("admin");

    const handleNavigateToMaterials = (
        event: MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault();
        navigate(`/${COURSES_PATHNAME}/1/${PROGRAM_PATHNAME}`);
    };

    return (
        <article className={styles.plate}>
            <header className={styles.header}>
                <div>
                    <span>#{course.courseId}.</span>
                    <h4>{course.courseName}</h4>
                </div>
                {isAdminPage && (
                    <WithAuth
                        authChildren={
                            <button
                                className={styles.deleteButton}
                                onClick={handleDelete}
                            >
                                <img src={deleteSrc} alt="Удалить" />
                            </button>
                        }
                        unAuthChildren={null}
                        allowedRoles={[Role.ADMIN]}
                    />
                )}
            </header>
            <div className={styles.about}>
                <p>{course.about}</p>
            </div>
            {isParticipant && (
                <footer className={styles.footer}>
                    <Button onClick={handleNavigateToMaterials}>
                        Перейти к материалам курса
                    </Button>
                </footer>
            )}
        </article>
    );
};

export default CoursePlate;
