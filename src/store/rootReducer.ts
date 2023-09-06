import { combineReducers } from "@reduxjs/toolkit";
import developeModeSlice from "./developeModeSlice";
import purchaseCartSlice from "./purchaseCartSlice";

export const rootReducer = combineReducers({
    developerMode: developeModeSlice,
    purchaseCart: purchaseCartSlice,
})