import { FC } from "react";

import { Helmet } from "react-helmet";

import { Courses } from "components/courses/Courses";

const CoursesPage: FC = () => {
    return (
        <>
            <Meta />
            <Courses />
        </>
    );
};

export default CoursesPage;

function Meta() {
    return (
        <Helmet>
            <title>Courses</title>
            <meta name="description" content="Доступные курсы" />
        </Helmet>
    );
}
