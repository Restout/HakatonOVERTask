import { authApi } from "api";

import { IAttendance } from "types/attendance.interface";

const PATH = "/attendance";

class AttendanceService {
    static get = (scheduleId: number) => {
        return authApi.get<IAttendance[]>(`${PATH}/${scheduleId}`);
    };
}

export default AttendanceService;
