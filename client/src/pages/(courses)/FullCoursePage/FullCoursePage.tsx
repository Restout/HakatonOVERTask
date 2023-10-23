import { FC, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { FullCourseInfo } from "components/courses/FullCourseInfo";
import { FullCourseIntro } from "components/courses/FullCourseIntro";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";

import CoursesService from "services/CoursesService";

import styles from "./fullCoursePage.module.scss";

const FullCoursePage: FC = () => {
    const { courseId = "" } = useParams();
    const [isEnrolling, setIsEnrolling] = useState(false);

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["courses", courseId],
        queryFn: () => CoursesService.getById(Number(courseId)),
        select(data) {
            return data.data;
        },
    });

    return (
        <>
            <Meta courseName={data?.courseName} />
            {isSuccess && (
                <>
                    <FullCourseIntro
                        openEnrol={() => setIsEnrolling(true)}
                        isEnrolling={isEnrolling}
                        course={data}
                    />
                    <FullCourseInfo
                        closeEnrol={() => setIsEnrolling(false)}
                        isEnrolling={isEnrolling}
                        course={data}
                    />
                </>
            )}
            <Error message={isError ? "Something went wrong" : null} />
            <Loading isLoading={isLoading} />
        </>
    );
};

export default FullCoursePage;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return (
        <div className={styles.loaderWrapper}>
            <Loader isCenter={true} />
        </div>
    );
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return (
        <div className={styles.alertWrapper}>
            <Alert variant="error" className={styles.alert}>
                {message}
            </Alert>
        </div>
    );
}

function Meta({ courseName }: { courseName?: string }) {
    return (
        <Helmet>
            <title>{courseName ? `Course | ${courseName}` : "Course"}</title>
            <meta
                name="description"
                content={`Описание курса ${courseName || ""}`}
            />
        </Helmet>
    );
}
