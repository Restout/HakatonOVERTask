export interface ISchedule {
    scheduleId: number;
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    firstName: string;
    lastname: string;
    lesson: string;
}

export interface ScheduleDTO {
    day: string;
    startTime: string;
    endTime: string;
    lessonName: string;
    lessonDescription: string;
    location: string;
    organizerLastName: string;
    organizerFirstName: string;
}
