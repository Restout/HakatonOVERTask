import { authApi } from "api";

const PATH = "/files";

class FilesService {
    static get = async (fileId: number) => {
        return authApi.get<Blob>(`${PATH}/${fileId}`, {
            method: "GET",
            responseType: "blob",
            headers: {
                "Content-Type": "application/octet-stream",
            },
        });
    };

    static create = async (materialId: number, data: FormData) => {
        return authApi.post(PATH, data, { params: { materialId } });
    };

    static createAnswer = async (taskId: number, data: FormData) => {
        return authApi.post(PATH, data, { params: { taskId } });
    };

    static delete = async (fileId: number) => {
        return authApi.delete(`${PATH}/${fileId}`);
    };
}

export default FilesService;
