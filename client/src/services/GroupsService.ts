import { api, authApi } from "api";

import { IGroup } from "types/group.interface";

const PATH_NAME = "/groups";

class GroupsService {
    static getAll = async () => {
        return api.get<IGroup[]>(PATH_NAME);
    };

    static post = async (post: string) => {
        return authApi.post<IGroup>(post);
    };
}

export default GroupsService;
