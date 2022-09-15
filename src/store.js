import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./slices/item-slice"
import authReducer from "./slices/auth-slice"

const reducer = {
    auth :authReducer,
    item: itemReducer
};

const store = configureStore({
    reducer: reducer,
});

export default store;