import { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Materials } from "components/courses/Materials";
import { Container } from "components/shared/Container";

import useTypedSelector from "hooks/shared/useTypedSelector";

import LessonService from "services/LessonService";
import MaterialsService from "services/MaterialsService";

import styles from "./programPage.module.scss";

const ProgramPage: FC = () => {
    const { lessonId = "" } = useParams();
    const userId = useTypedSelector((state) => state.user.user?.id);

    const { data: lesson } = useQuery({
        queryFn: () => LessonService.getById(parseInt(lessonId)),
        queryKey: ["materials", lessonId],
        select: (data) => data.data,
    });
    const { data: materials } = useQuery({
        queryFn: () =>
            MaterialsService.get(parseInt(lessonId), userId as number),
        queryKey: ["materials", lessonId, userId],
        select: (data) => data.data,
    });

    console.log(lesson);
    console.log(materials);

    return (
        <>
            <ProgramIntro />
            <Materials />
        </>
    );
};

export default ProgramPage;

function ProgramIntro() {
    return (
        <section className={styles.intro}>
            <Container>
                <div className={styles.introContent}>
                    <div>
                        <h2>Информация о курсе</h2>
                        <h1>Программирование</h1>
                        <p>Изучение чего-то там очень интересного</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
