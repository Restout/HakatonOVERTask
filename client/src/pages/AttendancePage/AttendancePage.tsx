import { FC } from "react";

import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { Attendance } from "components/attendance/Attendance";

interface Props {}

const AttendancePage: FC<Props> = () => {
    const { scheduleId = "" } = useParams();

    return (
        <div>
            <Meta />
            <Attendance scheduleId={parseInt(scheduleId)} />
        </div>
    );
};

export default AttendancePage;

function Meta() {
    return (
        <Helmet>
            <title>Attendance</title>
            <meta name="description" content="Посещаемость занятия" />
        </Helmet>
    );
}
