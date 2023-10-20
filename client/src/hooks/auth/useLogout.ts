import { useCallback } from "react";

import { useDispatch } from "react-redux";

import { logout } from "store/user/userSlice";

import { LocalStorageKeys } from "constants/localStorageKeys";

export const useLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LocalStorageKeys.token);
        dispatch(logout());
    }, [dispatch]);

    return handleLogout;
};
