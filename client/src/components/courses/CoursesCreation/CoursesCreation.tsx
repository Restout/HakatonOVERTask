import { FC } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cn from "clsx";

import { Title } from "components/ui/typography/Title";

import CoursesService from "services/CoursesService";

import { checkEmptyValidity } from "utils/checkEmptyValidity";

import { CourseDTO } from "types/course.interface";

import { CourseFormState, CoursesForm } from "../CoursesForm";
import styles from "./coursesCreation.module.scss";

interface Props {
    className?: string;
    close: () => void;
}

const CoursesCreation: FC<Props> = ({ className, close }) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isError } = useMutation({
        mutationFn: (data: CourseDTO) => {
            return CoursesService.add(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["courses"]);
            close();
        },
    });

    const handleSubmit = async (data: CourseFormState) => {
        const courseName = data.courseName.trim();
        const about = data.about.trim();
        const programm = data.programm.trim();
        const requirements = data.requirements.trim();
        const result = data.result.trim();

        if (
            !checkEmptyValidity([
                courseName,
                about,
                programm,
                requirements,
                result,
            ])
        ) {
            return;
        }

        mutate({ about, courseName, programm, requirements, result });
    };

    return (
        <div className={cn(styles.body, className)}>
            <Title className={styles.title}>Новый курс</Title>
            <CoursesForm
                onSubmit={handleSubmit}
                isDisabled={isLoading}
                isError={isError}
            />
        </div>
    );
};

export default CoursesCreation;
