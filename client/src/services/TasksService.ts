import { authApi } from "api";

import { ITask } from "types/task.interface";

const PATH = "/task";

class TasksService {
    static get = async (taskId: number) => {
        return authApi.get<ITask>(`${PATH}/${taskId}`);
    };

    static create = async (materialId: number, task: Omit<ITask, "taskId">) => {
        return authApi.post(PATH, task, { params: { materialId } });
    };

    static update = async (task: ITask) => {
        return authApi.put(`${PATH}/${task.taskId}`, task);
    };

    static delete = async (taskId: number) => {
        return authApi.delete(`${PATH}/${taskId}`);
    };
}

export default TasksService;
