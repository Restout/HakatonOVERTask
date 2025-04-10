export interface IGroup {
    groupId: number;
    groupName: string;
}

export interface GroupDTO {
    groupName: string;
    supervisiorId: number;
    courseId: number;
}

export interface GroupMember {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface UserDetails {
    id: number;
    birthday: string;
    phone: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    fatherName: string;
}

export interface ServerGroupResponse {
    groupId: number;
    groupName: string;
    creator: UserDetails;
    students: UserDetails[];
}

export interface GroupWithMembers extends IGroup {
    members: GroupMember[];
    creatorId: number;
}

export interface GroupCreateRequest {
    groupName: string;
    creatorId: number;
    supervisiorId?: number;
    courseId?: number;
}

export interface UserGroupRequest {
    groupId: number;
    userEmail: string;
}
