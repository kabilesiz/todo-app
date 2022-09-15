import {createSlice} from "@reduxjs/toolkit";
import {loginAction} from "../actions/loginAction";
import {authState} from "../states/authState";
import {logoutAction} from "../actions/logoutAction";

export const login = loginAction;
export const logout = logoutAction;

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            return {...action.payload};
        },
        [logout.fulfilled]: (state, action) => {
            return {...action.payload};
        }
    },
});
const {reducer} = authSlice;
export default reducer;
