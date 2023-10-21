import { authApi } from "api";

const PATH_NAME = "/material";

class MaterialsService {
    static get = async (lessonId: number, userId: number) => {
        return authApi.get(PATH_NAME, { params: { lessonId, userId } });
    };
}

export default MaterialsService;
