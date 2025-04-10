export interface IRoom {
    id: string;
    name: string;
    participants: string[];
    createdAt: string;
    createdBy: number;
}

export interface RoomCreateRequest {
    name: string;
    createdBy: number;
}

export interface RoomJoinRequest {
    roomId: string;
    userId: number;
} 