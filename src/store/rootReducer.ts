import { combineReducers } from "@reduxjs/toolkit";
import developeModeSlice from "./developeModeSlice";

export const rootReducer = combineReducers({
    developerMode: developeModeSlice
})