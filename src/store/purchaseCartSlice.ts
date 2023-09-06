import { createSlice } from "@reduxjs/toolkit";
import { CartItemtype } from "../types/itemType";

const initialState: Array<CartItemtype> = [];
const purchaseCartSlice = createSlice({
    name: "purchaseCart",
    initialState,
    reducers: {
        addToCart(state,actions) {
            return [...state,actions.payload as CartItemtype]
        },
        removeFromCart(state,actions) {
            return state.filter(item => item.id !== actions.payload);
        }
    },
})

export const {addToCart,removeFromCart} = purchaseCartSlice.actions;
export default purchaseCartSlice.reducer;