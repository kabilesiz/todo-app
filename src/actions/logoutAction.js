import {createAsyncThunk} from "@reduxjs/toolkit";

export const logoutAction = createAsyncThunk(
    "auth/logout",
    async () => {
        localStorage.removeItem("isAuth")
        localStorage.removeItem("userName")
        return {
            isAuth: false,
            name: "",
        };
    }
);