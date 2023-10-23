import { FC } from "react";

import { useQuery } from "@tanstack/react-query";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import AttendanceService from "services/AttendanceService";
import ScheduleService from "services/ScheduleService";

import { AttendanceTable } from "../AttendanceTable";
import styles from "./attendance.module.scss";

interface Props {
    scheduleId: number;
}

const Attendance: FC<Props> = ({ scheduleId }) => {
    const {
        data: attendanceData,
        isSuccess: isAttendanceSuccess,
        isLoading: isAttendanceLoading,
        isError: isAttendanceError,
    } = useQuery({
        queryFn: () => AttendanceService.get(scheduleId),
        queryKey: ["attendance", scheduleId],
        select: (data) => data.data,
    });

    const {
        data: scheduleData,
        isSuccess: isScheduleSuccess,
        isLoading: isScheduleLoading,
        isError: isScheduleError,
    } = useQuery({
        queryFn: () => ScheduleService.getById(scheduleId),
        queryKey: ["schedule", scheduleId],
        select: (data) => data.data,
    });

    const isSuccess = isScheduleSuccess && isAttendanceSuccess;
    const isError = isScheduleError && isAttendanceError;
    const isLoading = isScheduleLoading && isAttendanceLoading;

    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>Посещаемость</Title>
                {isSuccess &&
                    isScheduleSuccess &&
                    isAttendanceSuccess &&
                    attendanceData.length > 0 && (
                        <AttendanceTable
                            attendance={attendanceData}
                            schedule={scheduleData}
                        />
                    )}
                <Loading isLoading={isLoading} />
                <Error isError={isError} />
                {isSuccess &&
                    isAttendanceSuccess &&
                    attendanceData.length < 1 && (
                        <Alert variant="info">
                            Нет информации о посещаемости
                        </Alert>
                    )}
            </Container>
        </section>
    );
};

export default Attendance;

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ isError }: { isError: boolean }) {
    if (!isError) return null;

    return (
        <Alert variant="error">Что-то пошло не так, попробуйте еще раз</Alert>
    );
}
