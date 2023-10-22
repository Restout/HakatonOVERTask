export interface ITask {
    taskId: number;
    description: string;
    title: string;
    grade: number;
    answers: { fileId: number; fileName: string }[];
}
