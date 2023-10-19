import { api } from "api";

import { ISchedule } from "types/schedule.interface";

const PATH_NAME = "/scheldue";

class ScheduleService {
    static get = async (groupId: string, date: string) => {
        return api.get<ISchedule[]>(`${PATH_NAME}/${groupId}`, {
            params: { date },
        });
    };
}

export default ScheduleService;
