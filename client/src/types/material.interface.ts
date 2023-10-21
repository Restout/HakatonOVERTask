export interface IMaterial {
    materialId: number;
    dateStart: string;
    dateEnd: string;
    description: string;
    title: string;
    practical: MaterialFile[];
    theoretical: MaterialFile[];
    independent: MaterialFile[];
    tasks: { taskId: string }[];
}

export interface MaterialFile {
    fileId: number;
    fileName: string;
    file: Blob;
}

export interface MaterialDTO {
    dateStart: string;
    dateEnd: string;
    description: string;
    title: string;
}
