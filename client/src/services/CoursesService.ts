import { api, authApi } from "api";

import { CourseDTO, ICourse } from "types/course.interface";

const PATH_NAME = "/courses";

class CoursesService {
    static getAll = async () => {
        return api.get<ICourse[]>(PATH_NAME);
    };

    static getById = async (courseId: number) => {
        return api.get<ICourse>(`${PATH_NAME}/${courseId}`);
    };

    static getByUserId = async (userId: number) => {
        return api.get<ICourse[]>(PATH_NAME, { params: { userId } });
    };

    static delete = async (id: number) => {
        return authApi.delete(`${PATH_NAME}/${id}`);
    };

    static add = async (course: CourseDTO) => {
        return authApi.post(PATH_NAME, course);
    };
}

export default CoursesService;
