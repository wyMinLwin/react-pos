import { createSlice } from "@reduxjs/toolkit";
const initialState: boolean = true;
const developerModeSlice = createSlice({
	name: "DeveloperMode",
	initialState,
	reducers: {
		toggleDeveloperMode(state) {
			return !state;
		},
	},
});

export const { toggleDeveloperMode } = developerModeSlice.actions;
export default developerModeSlice.reducer;
