import {createAsyncThunk} from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk(
    "auth/login",
    async ({userName}) => {
        if (userName !== null || userName !== undefined)
        {
            localStorage.setItem("isAuth", JSON.stringify(true))
            localStorage.setItem("userName", userName)
            return {
                isAuth: true,
                userName,
            }
        }
        return {
            isAuth: false,
            userName: "",
        };
    }
);