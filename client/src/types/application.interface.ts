import { BidStatus } from "constants/bidsStatus";

interface ApplicationBase {
    applicationID: number;
    courseName: string;
    firstName: string;
    lastName: string;
    fatherName: string;
    status: BidStatus;
    dateOfChange: string;
}

export interface IApplicationContacts extends ApplicationBase {
    email: string;
    phone: string;
}

export interface IApplicationInfo extends ApplicationBase {
    chiefName: string;
    currentPosition: string;
    departmentName: string;
    experience: number;
    merits: string;
    motivationLetter: string;
}

export interface ApplicationDTO {
    courseID: number;
    ID: number;
    chiefName: string;
    currentPosition: string;
    departmentName: string;
    experience: number;
    merits: string;
    motivationLetter: string;
}
