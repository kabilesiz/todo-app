import {createAsyncThunk} from "@reduxjs/toolkit";
import itemService from "../services/item-service";

export const updateItemAction =  createAsyncThunk("items/update", async ({id,payload}) => {
    let response = await itemService.updateItem(id,payload)
    if (response.data) {
        return {...response.data};
    }
    return [];
});