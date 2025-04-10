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
        const location = data.location.trim();
        const startTime = data.startTime.trim();
        const endTime = data.endTime.trim();
        const lessonName = data.lessonName.trim();
        const lessonDescription = data.lessonDescription?.trim() || '';
        const organizerLastName = data.organizerLastName.trim();
        const organizerFirstName = data.organizerFirstName.trim();
        const day = transformDate(data.day);

        if (
            !checkEmptyValidity([
                location,
                startTime,
                endTime,
                lessonName,
                day,
                organizerLastName,
                organizerFirstName
            ])
        ) {
            return;
        }

        const [startTimeHours, startTimeMinutes] = startTime.split(":");
        const formattedStartHours =
            startTimeHours.length === 1 ? "0" + startTimeHours : startTimeHours;
        const formattedStartMinutes =
            startTimeMinutes.length === 1
                ? "0" + startTimeMinutes
                : startTimeMinutes;

        const [endTimeHours, endTimeMinutes] = endTime.split(":");
        const formattedEndHours =
            endTimeHours.length === 1 ? "0" + endTimeHours : endTimeHours;
        const formattedEndMinutes =
            endTimeMinutes.length === 1 ? "0" + endTimeMinutes : endTimeMinutes;

        const formattedStartTime = `${day}T${formattedStartHours}:${formattedStartMinutes}:00`;
        const formattedEndTime = `${day}T${formattedEndHours}:${formattedEndMinutes}:00`;

        const newSchedule: ScheduleDTO = {
            day,
            location,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            lessonName,
            lessonDescription,
            organizerLastName,
            organizerFirstName
        };

        mutate(newSchedule);
    };

    return (
        <div className={cn(styles.body, className)}>
            <Title className={styles.title}>Новое занятие</Title>
            <ScheduleForm
                onSubmit={handleSubmit}
                isDisabled={isLoading}
                isError={isError}
            />
        </div>
    );
};

export default ScheduleCreation;
