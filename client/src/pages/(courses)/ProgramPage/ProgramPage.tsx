import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Materials } from "components/courses/Materials";
import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";

import useTypedSelector from "hooks/shared/useTypedSelector";

import LessonService from "services/LessonService";
import MaterialsService from "services/MaterialsService";

import { ILesson } from "types/lesson.interface";

import styles from "./programPage.module.scss";

const ProgramPage: FC = () => {
    const { lessonId = "" } = useParams();
    const userId = useTypedSelector((state) => state.user.user?.id) as number;

    const {
        data: lesson,
        isSuccess: isLessonSuccess,
        isError: isLessonError,
        isLoading: isLessonLoading,
    } = useQuery({
        queryFn: () => LessonService.getById(parseInt(lessonId)),
        queryKey: ["lessons", lessonId],
        select: (data) => data.data,
    });

    const {
        data: materials,
        isSuccess: isMaterialsSuccess,
        isError: isMaterialsError,
        isLoading: isMaterialLoading,
    } = useQuery({
        queryFn: () =>
            MaterialsService.get(parseInt(lessonId), userId),
        queryKey: ["materials", lessonId, userId],
        select: (data) => data.data,
    });

    return (
        <>
            <Error isError={isLessonError} />
            <Loading isLoading={isLessonLoading} />
            {isLessonSuccess && <ProgramIntro lesson={lesson} />}
            <Error isError={isMaterialsError} />
            <Loading isLoading={isMaterialLoading} />
            {isMaterialsSuccess && (
                <Materials
                    lessonId={parseInt(lessonId)}
                    materials={materials}
                />
            )}
        </>
    );
};

export default ProgramPage;

function ProgramIntro({ lesson }: { lesson: ILesson }) {
    return (
        <section className={styles.intro}>
            <Container>
                <div className={styles.introContent}>
                    <div>
                        <h2>Информация о курсе</h2>
                        <h1>{lesson.lessonName}</h1>
                        <p>{lesson.lessonName}</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) {
        return null;
    }

    return <Loader className={styles.loader} />;
}

function Error({ isError }: { isError: boolean }) {
    if (!isError) {
        return null;
    }

    return (
        <Alert variant="error" className={styles.alert}>
            Что-то пошло не так, попробуйте еще раз
        </Alert>
    );
}
