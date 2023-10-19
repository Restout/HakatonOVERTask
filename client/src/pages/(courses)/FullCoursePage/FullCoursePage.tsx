import { FC } from "react";

import { FullCourseInfo } from "components/courses/FullCourseInfo";
import { FullCourseIntro } from "components/courses/FullCourseIntro";

const FullCoursePage: FC = () => {
    return (
        <>
            <FullCourseIntro />
            <FullCourseInfo />
        </>
    );
};

export default FullCoursePage;
