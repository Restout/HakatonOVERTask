import { FC, Fragment, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Container } from "components/shared/Container";
import { Alert } from "components/ui/Alert";
import { Loader } from "components/ui/Loader";
import { Title } from "components/ui/typography/Title";

import ScheduleService from "services/ScheduleService";

import { formatDate } from "utils/formatDate";
import { formatTime } from "utils/formatTime";
import { getInterval } from "utils/getInterval";

import { ISchedule } from "types/schedule.interface";

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

    const filteredSchedule = useMemo(() => {
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

        if (!data) return result;

        data.forEach((schedule) => {
            const { dayOfWeek } = formatDate(schedule.day);
            result[dayOfWeek].lessons.push(schedule);
            result[dayOfWeek].date = formatDate(schedule.day).date;
        });

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
                <Title className={styles.title}>
                    Расписание занятий группы: {groupId}
                </Title>
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
