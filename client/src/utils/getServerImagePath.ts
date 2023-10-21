import { API_URL } from "api";

export const getServerImagePath = (imageName: string) => {
    return API_URL + "/static/media" + imageName;
};
