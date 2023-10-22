import { authApi } from "api";

import { IMaterial, MaterialDTO } from "types/material.interface";

const PATH_NAME = "/material";

class MaterialsService {
    static get = async (lessonId: number, userId: number) => {
        return authApi.get<IMaterial[]>(PATH_NAME, {
            params: { lessonId, userId },
        });
    };

    static create = async (
        lessonId: number,
        userId: number,
        data: MaterialDTO,
    ) => {
        return authApi.post(PATH_NAME, data, {
            params: { lessonId, userId },
        });
    };
}

export default MaterialsService;
