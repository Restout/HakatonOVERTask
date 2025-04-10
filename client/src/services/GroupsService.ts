import { api, authApi } from "api";

import { GroupCreateRequest, GroupDTO, GroupWithMembers, IGroup, UserGroupRequest } from "types/group.interface";

const PATH_NAME = "/groups";

class GroupsService {
    static getAll = async (userId?: number) => {
        return api.get<IGroup[]>(PATH_NAME, { params: { userId } });
    };

    static getGroup = async (groupId: number) => {
        return api.get<GroupWithMembers>(`${PATH_NAME}/${groupId}`);
    };

    // Метод может принимать как GroupCreateRequest, так и GroupDTO
    static createGroup = async (data: GroupCreateRequest | GroupDTO) => {
        // Убедимся, что в data есть creatorId
        const processedData = 'creatorId' in data 
            ? data 
            : { ...data, creatorId: (data as GroupDTO).supervisiorId };
        
        return api.post<IGroup>(PATH_NAME, processedData);
    };

    // Алиас для обратной совместимости
    static post = async (data: GroupDTO) => {
        return GroupsService.createGroup({
            ...data,
            creatorId: data.supervisiorId
        });
    };

    static addUserToGroup = async (data: UserGroupRequest) => {
        return api.put<void>("/users/group", data);
    };

    static removeUserFromGroup = async (data: UserGroupRequest) => {
        return api.delete<void>("/users/group", { data });
    };

    static delete = async (groupId: number) => {
        return authApi.delete(`${PATH_NAME}/${groupId}`);
    };
}

export default GroupsService; 