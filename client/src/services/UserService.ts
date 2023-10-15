import { api } from "api";

import { BaseUser, IUser } from "types/user.interface";

class UserService {
    static register = async (user: BaseUser) => {
        return api.post<IUser>("/auth/register", user);
    };
}

export default UserService;
