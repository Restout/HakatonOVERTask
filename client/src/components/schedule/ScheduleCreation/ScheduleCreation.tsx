import { FC } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cn from "clsx";

import { Title } from "components/ui/typography/Title";

import ScheduleService from "services/ScheduleService";

import { checkEmptyValidity } from "utils/checkEmptyValidity";
import { transformDate } from "utils/transformDate";

import { ScheduleDTO } from "types/schedule.interface";

import { ScheduleForm } from "../ScheduleForm";
import { ScheduleFormState } from "../ScheduleForm/ScheduleForm";
import styles from "./scheduleCreation.module.scss";

interface Props {
    className?: string;
    close: () => void;
    groupId: number;
}

const ScheduleCreation: FC<Props> = ({ close, className, groupId }) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isError } = useMutation(
        (data: ScheduleDTO) => {
            return ScheduleService.create(groupId, data);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["schedule"]);
                close();
            },
        },
    );

    const handleSubmit = async (data: ScheduleFormState) => {
        const audience = data.audience.trim();
        const startTime = data.startTime.trim();
        const endTime = data.endTime.trim();
        const lesson = data.lesson.trim();
        const day = transformDate(data.day);
        const teacherId = data.teacherId.trim();

        if (
            !checkEmptyValidity([
                audience,
                startTime,
                endTime,
                lesson,
                day,
                teacherId,
            ])
        ) {
            return;
        }

        const formattedStartTime = `${day}T${startTime}:00`;
        const formattedEndTime = `${day}T${endTime}:00`;

        const formattedAudience =
            audience === "Дистанционно" ? "Дистанционно" : audience;

        const newSchedule: ScheduleDTO = {
            day: transformDate(data.day),
            audience: formattedAudience,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            lesson,
            teacherId: parseInt(teacherId),
        };

        console.log(newSchedule);
        mutate(newSchedule);
    };

    return (
        <div className={cn(styles.body, className)}>
            <Title className={styles.title}>Новый курс</Title>
            <ScheduleForm
                onSubmit={handleSubmit}
                isDisabled={isLoading}
                isError={isError}
            />
        </div>
    );
};

export default ScheduleCreation;
