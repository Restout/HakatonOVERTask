import { authApi } from "api";

import {
    ApplicationDTO,
    IApplicationContacts,
    IApplicationInfo,
} from "types/application.interface";

import { BidStatus } from "constants/bidsStatus";

import { PaginationParams } from "./types";

class ApplicationsService {
    static getByUserId = async (
        userId: number,
        { limit, page }: PaginationParams,
    ) => {
        return authApi.get<IApplicationContacts[]>("/applications", {
            params: { userId, size: limit, page },
        });
    };

    static getById = async (id: number) => {
        return authApi.get<IApplicationInfo>(`/application/${id}`);
    };

    static getStudentApplications = (studentId: number) => {
        return authApi.get<IApplicationInfo[]>(`/studentapplications`, {
            params: { userId: studentId },
        });
    };

    static create = async (application: ApplicationDTO) => {
        return authApi.post<IApplicationInfo>(
            "/application/create",
            application,
        );
    };

    static updateStatus = async (applicationId: number, status: BidStatus) => {
        return authApi.put(
            `applicatoin/changestatus/${applicationId}`,
            undefined,
            { params: { answer: status } },
        );
    };

    static delete = async (applicationId: number) => {
        return authApi.delete("application/delete", {
            params: { id: applicationId },
        });
    };
}

export default ApplicationsService;
