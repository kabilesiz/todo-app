import {createAsyncThunk} from "@reduxjs/toolkit";
import itemService from "../services/item-service";

export const getItemsAction = createAsyncThunk("items/getAll", async ({page,pageSize, sortParams}) => {
    let response = await itemService.getItems(page,pageSize,sortParams);
    if (response.data) {
        return {...response.data};
    }
    return [];
});