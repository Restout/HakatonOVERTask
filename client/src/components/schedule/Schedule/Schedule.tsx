import { FC, Fragment, useMemo, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import WithAuth from "hocs/WithAuth";
import { Link, useSearchParams } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Button } from "components/ui/Button";
import { DeleteButton } from "components/ui/DeleteButton";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import useTypedSelector from "hooks/shared/useTypedSelector";

import ScheduleService from "services/ScheduleService";

import { formatDate } from "utils/formatDate";
import { formatTime } from "utils/formatTime";
import { getInterval } from "utils/getInterval";

import { ISchedule } from "types/schedule.interface";

import { Role } from "constants/role.enum";
import { ATTENDANCE_PATHNAME } from "constants/routesPathnames";

import { ScheduleCreation } from "../ScheduleCreation";
import {
    getNextMonday,
    getPreviousMonday,
    getPreviousWeekMonday,
} from "./getMonday";
import styles from "./schedule.module.scss";

const DATE_SEARCH_NAME = "date";

interface Props {
    groupId: string;
}

const Schedule: FC<Props> = ({ groupId }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAdding, setIsAdding] = useState(false);
    const user = useTypedSelector((state) => state.user.user);
    const queryClient = useQueryClient();

    const date = searchParams.get(DATE_SEARCH_NAME) ?? getPreviousMonday();

    const handleNextClick = () => {
        searchParams.set(DATE_SEARCH_NAME, getNextMonday(date));
        setSearchParams(searchParams);
    };

    const handlePreviousClick = () => {
        searchParams.set(DATE_SEARCH_NAME, getPreviousWeekMonday(date));
        setSearchParams(searchParams);
    };

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: () => ScheduleService.get(groupId, date),
        queryKey: ["schedule", date, groupId],
        select: (data) => data.data,
    });

    const { mutate } = useMutation((id: number) => ScheduleService.delete(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(["schedule"]);
        },
    });

    const filteredSchedule = useMemo(() => {
        const weekend: Record<string, number> = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4,
            Saturday: 5,
        };

        const result: {
            dayOfWeek: number;
            lessons: ISchedule[];
            date: string;
        }[] = [
            { dayOfWeek: 0, lessons: [], date: "" },
            { dayOfWeek: 1, lessons: [], date: "" },
            { dayOfWeek: 2, lessons: [], date: "" },
            { dayOfWeek: 3, lessons: [], date: "" },
            { dayOfWeek: 4, lessons: [], date: "" },
            { dayOfWeek: 5, lessons: [], date: "" },
        ];

        console.log("Initial result");
        console.log(result);

        if (!data) return result;

        console.log("data");
        console.log(data);

        data.forEach((schedule) => {
            console.log("schedule in each loop");
            console.log(schedule);
            const { dayOfWeek } = formatDate(schedule.day.split("T")[0]);
            const index = weekend[dayOfWeek];
            result[index].lessons.push(schedule);
            result[index].date = formatDate(schedule.day).date;
            console.log("result after each loop");
        });

        console.log("final result");
        return result;
    }, [data]);

    const isEmpty = useMemo(() => {
        return filteredSchedule.every(
            (schedule) => schedule.lessons.length < 1,
        );
    }, [filteredSchedule]);

    return (
        <section className={styles.section}>
            <Container>
                <header className={styles.header}>
                    <Title>Расписание занятий группы: {groupId}</Title>
                    <WithAuth
                        authChildren={
                            <Button
                                variant="dark-blue"
                                onClick={() => setIsAdding((prev) => !prev)}
                            >
                                {isAdding ? "Отменить" : "Добавить"}
                            </Button>
                        }
                        unAuthChildren={null}
                        allowedRoles={[Role.ADMIN, Role.SUPERVISOR]}
                    />
                </header>
                {user && isAdding && (
                    <WithAuth
                        authChildren={
                            <ScheduleCreation
                                className={styles.creation}
                                close={() => setIsAdding(false)}
                                groupId={parseInt(groupId)}
                            />
                        }
                        unAuthChildren={null}
                        allowedRoles={[Role.ADMIN, Role.SUPERVISOR]}
                    />
                )}
                <Controls
                    interval={getInterval(date)}
                    next={handleNextClick}
                    previous={handlePreviousClick}
                />
                {isSuccess && (
                    <>
                        {filteredSchedule.map((scheduleData) => (
                            <Fragment key={scheduleData.dayOfWeek}>
                                {scheduleData.lessons.length > 0 && (
                                    <div className={styles.schedule}>
                                        <div className={styles.day}>
                                            <span>{scheduleData.date}</span>
                                        </div>
                                        <ul>
                                            {scheduleData.lessons.map(
                                                (lesson) => (
                                                    <li key={lesson.scheldueId}>
                                                        <div
                                                            className={
                                                                styles.time
                                                            }
                                                        >
                                                            {formatTime(
                                                                lesson.startTime,
                                                            )}
                                                            -
                                                            {formatTime(
                                                                lesson.endTime,
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h5>
                                                                {lesson.lesson}
                                                            </h5>
                                                            <p>
                                                                {
                                                                    lesson.lastname
                                                                }{" "}
                                                                {
                                                                    lesson.firstName
                                                                }
                                                            </p>
                                                            <p>
                                                                {
                                                                    lesson.audience
                                                                }
                                                            </p>
                                                            <WithAuth
                                                                authChildren={
                                                                    <DeleteButton
                                                                        onClick={() =>
                                                                            mutate(
                                                                                lesson.scheldueId,
                                                                            )
                                                                        }
                                                                        className={
                                                                            styles.deleteButton
                                                                        }
                                                                    />
                                                                }
                                                                unAuthChildren={
                                                                    null
                                                                }
                                                                allowedRoles={[
                                                                    Role.ADMIN,
                                                                    Role.SUPERVISOR,
                                                                ]}
                                                            />
                                                            <WithAuth
                                                                authChildren={
                                                                    <Link
                                                                        className={
                                                                            styles.attendanceLink
                                                                        }
                                                                        to={`/${ATTENDANCE_PATHNAME}/${lesson.scheldueId}`}
                                                                    >
                                                                        Посещаемость
                                                                    </Link>
                                                                }
                                                                unAuthChildren={
                                                                    null
                                                                }
                                                                allowedRoles={[
                                                                    Role.ADMIN,
                                                                    Role.TEACHER,
                                                                    Role.SUPERVISOR,
                                                                ]}
                                                            />
                                                        </div>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </Fragment>
                        ))}
                    </>
                )}
                <EmptyAlert isEmpty={isEmpty} isLoading={isLoading} />
                <Error message={isError ? "Something went wrong" : null} />
                <Loading isLoading={isLoading} />
            </Container>
        </section>
    );
};

export default Schedule;

function Controls({
    interval,
    next,
    previous,
}: {
    interval: string;
    next: () => void;
    previous: () => void;
}) {
    return (
        <div className={styles.controls}>
            <div>
                <button onClick={previous}>Предыдущая неделя</button>
                <p>{interval}</p>
                <button onClick={next}>Следующая неделя</button>
            </div>
        </div>
    );
}

function Loading({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) return null;

    return <Loader isCenter={true} />;
}

function Error({ message }: { message: string | null }) {
    if (!message) return null;

    return <Alert variant="error">{message}</Alert>;
}

function EmptyAlert({
    isEmpty,
    isLoading,
}: {
    isEmpty: boolean;
    isLoading: boolean;
}) {
    if (!isEmpty || isLoading) return null;

    return <Alert variant="info">На этой неделе занятий нет</Alert>;
}
