import { useQuery } from "@tanstack/react-query";

import { setUser } from "store/user/userSlice";

import useTypedDispatch from "hooks/shared/useTypedDispatch";

import UserService from "services/UserService";

import { LocalStorageKeys } from "constants/localStorageKeys";

import { useLogout } from "./useLogout";

export const useRefresh = () => {
    const logout = useLogout();
    const dispatch = useTypedDispatch();

    const isTokenExisting = Boolean(
        localStorage.getItem(LocalStorageKeys.token),
    );

    return useQuery({
        queryFn: UserService.refresh,
        queryKey: ["refresh"],
        enabled: isTokenExisting,
        onError() {
            logout();
        },
        onSuccess(data) {
            dispatch(setUser(data.data));
        },
    });
};
