import {createSlice} from '@reduxjs/toolkit';
type developerModeType = boolean;
const initialState:developerModeType = false;
const developerModeSlice = createSlice({
    name:"DeveloperMode",
    initialState,
    reducers: {
        toggleDeveloperMode(state) {
            return !state; 
        }
    }
})

export const {toggleDeveloperMode} = developerModeSlice.actions;
export default developerModeSlice.reducer;