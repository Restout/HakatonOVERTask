import { FC } from "react";

import { Checkbox } from "components/ui/Checkbox";

import { formatDate } from "utils/formatDate";

import { IAttendance } from "types/attendance.interface";
import { ISchedule } from "types/schedule.interface";

import styles from "./attendanceTable.module.scss";

interface Props {
    attendance: IAttendance[];
    schedule: ISchedule;
}

const AttendanceTable: FC<Props> = ({ attendance, schedule }) => {
    return (
        <table className={styles.table}>
            <TableHead />
            <TableBody attendance={attendance} schedule={schedule} />
        </table>
    );
};

export default AttendanceTable;

function TableHead() {
    return (
        <thead className={styles.tableHead}>
            <tr>
                <th>Предмет</th>
                <th>Дата проведения</th>
                <th>Учащийся</th>
                <th>Явка</th>
            </tr>
        </thead>
    );
}

function TableBody({
    attendance,
    schedule,
}: {
    attendance: IAttendance[];
    schedule: ISchedule;
}) {
    const { lesson, day } = schedule;

    return (
        <tbody className={styles.tableBody}>
            {attendance.map(({ has_been, studentLastName }) => (
                <tr key={studentLastName}>
                    <td data-label>{lesson}</td>
                    <td data-label>{formatDate(day).date}</td>
                    <td data-label>{studentLastName}</td>
                    <td data-label>
                        <Checkbox className={styles.checkbox} checked={has_been} />
                    </td>
                </tr>
            ))}
        </tbody>
    );
}
