import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    name: string;
}

const initialState: UserState = {
    name: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export const userReducer = userSlice.reducer;
