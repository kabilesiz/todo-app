import {createSlice} from "@reduxjs/toolkit";
import {getItemsAction} from "../actions/getItemsAction";
import {itemList} from "../states/itemList";
import {deleteItemAction} from "../actions/deleteItemAction";
import {updateItemAction} from "../actions/updateAction";
import {createItemAction} from "../actions/createItemAction";

export const getItems = getItemsAction;
export const deleteItem = deleteItemAction;
export const updateItem = updateItemAction;
export const createItem = createItemAction;

const itemSlice = createSlice({
    name: "items",
    initialState: itemList,
    extraReducers: {
        [getItems.fulfilled]: (state, action) => {
            return {...action.payload};
        }
    },
});
const {reducer} = itemSlice;
export default reducer;