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
        },
        toogleQuantity(state,actions) {
            const foundItem = state.find(item => item.id === actions.payload.id);
            if (foundItem && actions.payload.type === "ADD") {
                Object.assign(foundItem,{quantity:foundItem.quantity+1});
            } else if (foundItem && actions.payload.type === "REMOVE") {
                Object.assign(foundItem,{quantity:foundItem.quantity-1});
            }
        },
    },
})

export const {addToCart,removeFromCart,toogleQuantity} = purchaseCartSlice.actions;
export default purchaseCartSlice.reducer;