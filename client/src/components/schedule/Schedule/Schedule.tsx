import { FC } from "react";

import { Container } from "components/shared/Container";
import { Title } from "components/ui/typography/Title";

import { ILesson } from "types/lesson.interface";

import styles from "./schedule.module.scss";

interface Props {
    groupId: string;
}

const data: ILesson[] = [
    {
        audience: "Дистанционно",
        day: "2023-10-09",
        startTime: "10:00",
        endTime: "11:30",
        firstName: "Иванов",
        lastName: "Олег",
        id: "1",
        lesson: "Математика",
    },
    {
        audience: "513",
        day: "2023-10-10",
        endTime: "15:30",
        firstName: "Егор",
        id: "2",
        lastName: "Степанов",
        lesson: "Русский язык",
        startTime: "14:00",
    },
    {
        audience: "234",
        day: "2023-10-11",
        endTime: "9:30",
        firstName: "Григорий",
        id: "3",
        lastName: "Свистунов",
        lesson: "Физкультура",
        startTime: "8:00",
    },
    {
        audience: "432",
        day: "2023-10-12",
        endTime: "13:30",
        firstName: "Александр",
        id: "4",
        lastName: "Лебедов",
        lesson: "Иностранный язык",
        startTime: "12:00",
    },
    {
        audience: "111",
        day: "2023-10-13",
        endTime: "17:30",
        firstName: "Виктория",
        id: "5",
        lastName: "Баженова",
        lesson: "Математический анализ",
        startTime: "16:00",
    },
    {
        audience: "Дистанционно",
        day: "2023-10-14",
        endTime: "11:30",
        firstName: "Генадий",
        id: "6",
        lastName: "Громов",
        lesson: "Физика",
        startTime: "10:00",
    },
];

const Schedule: FC<Props> = ({ groupId }) => {
    const { startTime, endTime, lesson, lastName, firstName, audience, day } =
        data[0];

    return (
        <section className={styles.section}>
            <Container>
                <Title className={styles.title}>
                    Расписание занятий группы: {groupId}
                </Title>
                <Controls interval="09.10 - 14.10" />
                <div className={styles.schedule}>
                    <div className={styles.day}>
                        <span>{day}</span>
                    </div>
                    <ul>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.schedule}>
                    <div className={styles.day}>
                        <span>{day}</span>
                    </div>
                    <ul>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.schedule}>
                    <div className={styles.day}>
                        <span>{day}</span>
                    </div>
                    <ul>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                        <li>
                            <div className={styles.time}>
                                {startTime}-{endTime}
                            </div>
                            <div>
                                <h5>{lesson}</h5>
                                <p>
                                    {lastName} {firstName}
                                </p>
                                <p>{audience}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </Container>
        </section>
    );
};

export default Schedule;

function Controls({ interval }: { interval: string }) {
    return (
        <div className={styles.controls}>
            <div>
                <button>Предыдущая неделя</button>
                <p>{interval}</p>
                <button>Следующая неделя</button>
            </div>
        </div>
    );
}
