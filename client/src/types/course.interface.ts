export interface ICourse {
    courseId: number;
    courseName: string;
    about: string;
    programm: string;
    requirements: string;
    result: string;
    isParticipant: boolean;
}

export type CourseDTO = Omit<ICourse, "courseId" | "isParticipant">;
