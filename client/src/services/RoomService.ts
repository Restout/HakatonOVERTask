import { api } from "api";
import { IRoom, RoomCreateRequest, RoomJoinRequest } from "types/room.interface";

const PATH_NAME = "/rooms";

class RoomService {
    static getAll = async () => {
        return api.get<IRoom[]>(PATH_NAME);
    };

    static getById = async (roomId: string) => {
        return api.get<IRoom>(`${PATH_NAME}/${roomId}`);
    };

    static create = async (data: RoomCreateRequest) => {
        return api.post<IRoom>(PATH_NAME, data);
    };

    static join = async (data: RoomJoinRequest) => {
        return api.put<IRoom>(`${PATH_NAME}/join`, data);
    };

    static leave = async (data: RoomJoinRequest) => {
        return api.put<IRoom>(`${PATH_NAME}/leave`, data);
    };
}

export default RoomService; 