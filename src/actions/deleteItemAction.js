import {createAsyncThunk} from "@reduxjs/toolkit";
import itemService from "../services/item-service";

export const deleteItemAction = createAsyncThunk("events/delete", async ({id}) => {
    let response = await itemService.deleteItem(id);
    return response.data;
});