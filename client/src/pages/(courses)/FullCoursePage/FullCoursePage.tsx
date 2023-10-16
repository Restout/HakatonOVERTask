import { FC } from "react";

import { FullCourseInfo } from "components/courses/FullCourseInfo";
import { FullCourseIntro } from "components/courses/FullCourseIntro";

import styles from "./fullCoursePage.module.scss";

interface Props {}

const FullCoursePage: FC<Props> = () => {
    return (
        <>
            <FullCourseIntro />
            <FullCourseInfo />
        </>
    );
};

export default FullCoursePage;
