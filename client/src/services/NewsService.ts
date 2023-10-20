import { api, authApi } from "api";

import { INews } from "types/news.interface";

import { PaginationParams } from "./types";

const PATH_NAME = "/news";

class NewsService {
    static getAll = async ({ limit, page }: PaginationParams) => {
        return api.get<INews[]>(PATH_NAME, { params: { limit, page } });
    };

    static post = async (data: FormData) => {
        return authApi.post<INews>(PATH_NAME, data, { 
            headers: {
                "Content-Type": "multipart/form-data"
            }
         });
    };

    static delete = async (id: number) => {
        return authApi.delete(`${PATH_NAME}/${id}`);
    };
}

export default NewsService;
