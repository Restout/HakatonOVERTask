import { api } from "api";

import { ISchedule, ScheduleDTO } from "types/schedule.interface";

const PATH_NAME = "/schedule";

class ScheduleService {
    static get = async (groupId: string, date: string) => {
        const response = await api.get<any[]>(`${PATH_NAME}/${groupId}`, {
            params: { date },
        });
        
        // Map server response to our interface
        const mappedData = response.data.map(item => {
            // Учитываем возможные различия в названии поля id
            const scheduleId = item.scheduleId || item.scheldueId|| item.scheduleId;
            console.log("Item original ID:", item.scheduleId || item.scheldueId);
            
            return {
                scheduleId: scheduleId,
                day: item.day,
                startTime: item.startTime,
                endTime: item.endTime,
                location: item.location || item.audience,
                firstName: item.firstName || item.organizerFirstName,
                lastname: item.lastname || item.organizerLastName,
                lesson: item.lesson || item.lessonName
            };
        });
        
        response.data = mappedData;
        return response;
    };

    static getById = async (scheduleId: number) => {
        return api.get<ISchedule>(`${PATH_NAME}`, {
            params: { scheduleId },
        });
    };

    static create = async (groupId: number, data: ScheduleDTO) => {
        return api.post(`${PATH_NAME}/${groupId}`, data);
    };

    static delete = async (scheduleId: number) => {
        console.log(`Deleting schedule with ID: ${scheduleId}`);
        return api.delete(`${PATH_NAME}/${scheduleId}`);
    };
}

export default ScheduleService;
