import {createAsyncThunk} from "@reduxjs/toolkit";
import itemService from "../services/item-service";

export const createItemAction = createAsyncThunk("events/delete", async ({payload}) => {
    let response = await itemService.createItem(payload);
    return response.data;
});