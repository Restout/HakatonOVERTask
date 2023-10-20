import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IUser } from "types/user.interface";

interface UserState {
    user: IUser | null;
    isAuth: boolean;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.isAuth = true;
        },
        logout(state) {
            state.user = null;
            state.isAuth = false;
        },
    },
});

export const { logout, setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
