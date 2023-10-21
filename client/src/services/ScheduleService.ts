import { api, authApi } from "api";

import { ISchedule, ScheduleDTO } from "types/schedule.interface";

const PATH_NAME = "/scheldue";

class ScheduleService {
    static get = async (groupId: string, date: string) => {
        return api.get<ISchedule[]>(`${PATH_NAME}/${groupId}`, {
            params: { date },
        });
    };

    static create = async (groupId: number, data: ScheduleDTO) => {
        return authApi.post(`${PATH_NAME}/${groupId}`, data);
    };

    static delete = async (scheduleId: number) => {
        return authApi.delete(`${PATH_NAME}/${scheduleId}`);
    };
}

export default ScheduleService;
