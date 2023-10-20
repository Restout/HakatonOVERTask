import { authApi } from "api";

import { ILesson } from "types/lesson.interface";

const PATH = "/lesson";

class LessonService {
    static getAll = async (userId: number) => {
        return authApi.get<ILesson[]>(`${PATH}/${userId}`);
    };

    static create = async (lesson: Omit<ILesson, "lessonId">) => {
        return authApi.post(PATH, lesson);
    };

    static delete = async (lessonId: number) => {
        return authApi.delete(`${PATH}/${lessonId}`);
    };
}

export default LessonService;
