import { api } from "api";

import { PaginationParams } from "./types";

const PATH_NAME = "/news";

class NewsService {
    static getNews = async ({ limit, page }: PaginationParams) => {
        return api.get(PATH_NAME);
    };
}

export default NewsService;
