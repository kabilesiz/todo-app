import {createAsyncThunk} from "@reduxjs/toolkit";
import itemService from "../services/item-service";

export const getItemsAction = createAsyncThunk("items/getAll", async ({sortParams}) => {
    let response = await itemService.getItems(sortParams);
    if (response.data) {
        return {...response.data};
    }
    return [];
});