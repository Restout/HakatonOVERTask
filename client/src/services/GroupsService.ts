import { api, authApi } from "api";

import { GroupDTO, IGroup } from "types/group.interface";

const PATH_NAME = "/groups";

class GroupsService {
    static getAll = async (courseId?: number) => {
        return api.get<IGroup[]>(PATH_NAME, { params: { courseId } });
    };

    static post = async (data: GroupDTO) => {
        return authApi.post<IGroup>(PATH_NAME, data);
    };

    static delete = async (groupId: number) => {
        return authApi.delete(`${PATH_NAME}/${groupId}`);
    };
}

export default GroupsService;
