export interface ISchedule {
    scheldueId: number;
    day: string;
    startTime: string;
    endTime: string;
    audience: string;
    firstName: string;
    lastname: string;
    lesson: string;
}

export interface ScheduleDTO {
    day: string;
    lesson: string;
    startTime: string;
    endTime: string;
    teacherId: number;
    audience: string;
}
