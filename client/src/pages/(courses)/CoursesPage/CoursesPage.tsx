import { FC } from "react";

import { Courses } from "components/courses/Courses";

import styles from "./coursesPage.module.scss";

interface Props {}

const CoursesPage: FC<Props> = () => {
    return (
        <>
            <Courses />
        </>
    );
};

export default CoursesPage;
